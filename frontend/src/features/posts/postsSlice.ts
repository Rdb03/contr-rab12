import {IPosts} from "../../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPost, fetchPosts} from "./postsThunk.ts";
import {RootState} from "../../app/store.ts";

interface PostsState {
    posts: IPosts[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: PostsState = {
    posts: [],
    fetchLoading: false,
    createLoading: false,
};

export const PostsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
       builder.addCase(fetchPosts.pending, (state) => {
           state.fetchLoading = true;
       });

       builder.addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
           state.fetchLoading = false;
           state.posts = posts;
       });

       builder.addCase(fetchPosts.rejected, (state) => {
           state.fetchLoading = false;
       });

       builder.addCase(createPost.pending, (state) => {
           state.createLoading = true;
       });

       builder.addCase(createPost.fulfilled, (state) => {
           state.createLoading = false;
       });

       builder.addCase(createPost.rejected, (state) => {
           state.createLoading = false;
       });
   }
});

export const postsReducer = PostsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectLoading = (state: RootState) => state.posts.fetchLoading;

export const selectCreateLoading = (state: RootState) => state.posts.createLoading;
