import axiosApi from "../../../axiosApi.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPosts, OnePost, PostMutation} from "../../../types";

export const fetchPosts = createAsyncThunk<IPosts[], string | undefined>(
    'posts/fetchPosts',
    async (user) => {
        const url = user ? `/posts?user=${user}` : '/posts';
        const response = await axiosApi.get<IPosts[]>(url);
        return response.data;
    }
);

export const createPost = createAsyncThunk(
    'posts/create',
    async ({ cocktailMutation, token }: { cocktailMutation: PostMutation, token: string }) => {
        const formData = new FormData();
        formData.append('name', cocktailMutation.name);
        formData.append('user', cocktailMutation.user);

        if (cocktailMutation.image) {
            formData.append('image', cocktailMutation.image);
        }

        try {
            const response = await axiosApi.post('/posts', formData, {
                headers: {
                    Authorization: token,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error creating cocktail:', error);
            throw error;
        }
    },
);

export const fetchOnePost = createAsyncThunk<OnePost, string>(
    'posts/fetchOnePost',
    async (id) => {
        const response = await axiosApi.get<OnePost>('/posts/' + id);
        return response.data;
    }
);

export const deletePost = createAsyncThunk<void, { id: string, token: string | undefined }>(
    'posts/deletePost',
    async ({ id, token }) => {
        try {
            const response = await axiosApi.delete(`/posts/${id}`, {
                headers: {
                    Authorization: token,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    }
);
export const patchPost = createAsyncThunk<void, { id: string, token: string}>(
    'cocktails/patchCocktails',
    async ({id, token}) => {
        try {
            const response = await axiosApi.patch(`/posts/${id}/togglePublished`,  {isPublished: true},{
                headers: {
                    Authorization: token,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    });
