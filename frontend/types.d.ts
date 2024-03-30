export interface IUser {
    _id: string;
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    image: string | null;
    googleID: string;
}

export interface RegisterMutation {
    email: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface RegisterResponse {
    message: string;
    user: IUser;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export class GlobalError {
    error: string;
}