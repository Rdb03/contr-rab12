import axiosApi from "../../../axiosApi.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPosts} from "../../../types";

export const fetchPosts = createAsyncThunk<IPosts[], string | undefined>(
    'cocktails/fetchCocktails',
    async (user) => {
        const url = user ? `/posts?user=${user}` : '/posts';
        const response = await axiosApi.get<IPosts[]>(url);
        return response.data;
    }
);