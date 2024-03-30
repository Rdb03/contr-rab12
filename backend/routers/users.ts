import express from "express";
import User from "../models/User";
import mongoose from "mongoose";
import * as crypto from "crypto";
import {randomUUID} from "crypto";
import auth, {RequestWithUser} from "../middleware/auth";
import {OAuth2Client} from "google-auth-library";
import config from "../config";
import {imagesUpload} from "../multer";
import Post from "../models/Post";

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send({ error: "User not found!" });
        }

        return res.send(user);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
});

usersRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({ error: 'Google login error!' });
        }

        const email = payload['email'];
        const id = payload['sub'];
        const displayName = payload["name"];

        if (!email) {
            return res.status(400).send({ error: 'Not enough user data to continue' });
        }

        let user = await User.findOne({ googleID: id });

        if (!user) {
            user = new User({
                email: email,
                password: crypto.randomUUID(),
                googleID: id,
                displayName,
            });
        }

        user.generateToken();

        await user.save();

        return res.send({ message: 'Login with Google successful!', user });
    } catch (e) {
        return next(e);
    }
});


usersRouter.post("/", imagesUpload.single('avatar'), async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file ? req.file.filename : null,
        });

        user.generateToken();

        await user.save();
        return res.send(user);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

usersRouter.post("/sessions", async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res
                .status(400)
                .send({ error: "Wrong password or username! [Username]" });
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res
                .status(400)
                .send({ error: "Wrong password or username! [Password]" });
        }

        user.generateToken();
        await user.save();

        res.send({
            message: "Username and password correct!",
            user,
        });
    } catch (e) {
        next(e);
    }
});

usersRouter.delete("/sessions", auth, async (req, res) => {
    try {
        const user = (req as RequestWithUser).user;
        user.token = randomUUID();
        await user.save();
        res.send({ message: "Logout successful, token has been refreshed" });
    } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});



export default usersRouter;
