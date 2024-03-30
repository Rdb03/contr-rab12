import {Schema} from "mongoose";

export interface IUser {
    email: string;
    password: string;
    displayName: string;
    token: string;
    avatar: string | null;
    role: string;
    googleID?: string;
}

export interface IPost extends Document{
    user: Schema.Types.ObjectId;
    name: string;
    image: string;
    published: boolean;
}

interface IPostUser  {
    user: string;
    name: string;
    image: string;
}


