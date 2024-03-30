import axiosApi from "../../../axiosApi.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPosts, PostMutation} from "../../../types";

export const fetchPosts = createAsyncThunk<IPosts[], string | undefined>(
    'cocktails/fetchCocktails',
    async (user) => {
        const url = user ? `/posts?user=${user}` : '/posts';
        const response = await axiosApi.get<IPosts[]>(url);
        return response.data;
    }
);

export const createPost = createAsyncThunk(
    'cocktails/create',
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
