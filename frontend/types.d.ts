export interface IUser {
    _id: string;
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    avatar: string | null;
    googleID?: string;
}

export interface IPosts {
    _id: string;
    name: string;
    user: {
        _id: string;
        displayName: string;
    };
    image: string;
    published: boolean;
}

export interface PostMutation {
    name: string,
    image: File| null,
    user: string,
}
export interface OnePost {
    result: IPosts;
}

export interface RegisterResponse {
    user: IUser;
    message: string;
}

export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    avatar: file | null;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}
