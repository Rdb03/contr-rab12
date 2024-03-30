import User from "../models/User";
import express from "express";
import Post from "../models/Post";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import {IPostUser} from "../types";
import permit from "../middleware/permit";

const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
    try {
        const token = req.get('Authorization');
        const user = await User.findOne({ token });

        if (user && req.query.user) {
            const result = await Post.find({ user: req.query.user })
                .populate('user', 'displayName');
            return res.send(result);
        }

        if (user && user.role === 'admin') {
            const result = await Post.find().populate('user', 'displayName');
            return res.send(result);
        }

        const cocktails = await Post.find({ published: true }).populate('user', 'displayName');
        return res.send(cocktails);

    } catch {
        return res.sendStatus(500);
    }
});

postRouter.get('/:id', async (req, res) => {
    try {
        const result = await Post.findById(req.params.id).populate('user', 'displayName');

        if (!result) return res.status(404).send({ error: "Post not found!" });

        return res.send(result);
    } catch {
        return res.sendStatus(500);
    }
});

postRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
        const user = (req as RequestWithUser).user;

        if (!req.file) return res.status(400).send({ error: "Image is required!" });

        const postDate: IPostUser = {
            name: req.body.name,
            image: req.file.filename,
            user: user._id.toString(),
        };

        const post = new Post(postDate);

        try {
            await post.save();
            return res.send(post);
        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(e);
            }

            next(e);
        }
    },
);

postRouter.patch(
    "/:id/togglePublished",
    auth,
    permit("admin"),
    async (req, res, next) => {
        try {
            const post_id = req.params.id;
            const post = await Post.findById(post_id);

            if (!post) {
                return res.status(404).send({ error: "Not found!" });
            }

            post.published = !post.published;

            await post.save();
            return res.send(post);
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(error);
            }

            return next(error);
        }
    },
);

postRouter.delete("/:id", auth, permit("admin"), async (req, res, next) => {
    try {
        const post_id = req.params.id;
        const cocktail = await Post.findOne({ _id: post_id });

        if (!cocktail) {
            return res.status(404).send({ error: "Not found!" });
        }

        await Post.deleteOne({ _id: post_id });
        return res.send("Post deleted");
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

export default postRouter;