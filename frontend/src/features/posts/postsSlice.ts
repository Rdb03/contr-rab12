import {IPosts, OnePost} from "../../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPost, deletePost, fetchOnePost, fetchPosts, patchPost} from "./postsThunk.ts";
import {RootState} from "../../app/store.ts";

interface PostsState {
    posts: IPosts[];
    post: OnePost | null;
    fetchLoading: boolean;
    createLoading: boolean;
    fetchOneLoading: boolean;
    deleteLoading: boolean | string;
    patchLoading: boolean | string;
}

const initialState: PostsState = {
    posts: [],
    fetchLoading: false,
    createLoading: false,
    fetchOneLoading: false,
    post: null,
    deleteLoading: false,
    patchLoading: false,
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

       builder.addCase(fetchOnePost.pending, (state) => {
           state.fetchOneLoading = true;
       });

       builder.addCase(fetchOnePost.fulfilled, (state, action) => {
           state.fetchOneLoading = false;
           state.post = action.payload;
       });

       builder.addCase(fetchOnePost.rejected, (state) => {
           state.fetchOneLoading = false;
       });

       builder.addCase(deletePost.pending, (state, action) => {
           state.deleteLoading = !!action.meta.arg;
       });
       builder.addCase(deletePost.fulfilled, (state) => {
           state.deleteLoading = false;
       });
       builder.addCase(deletePost.rejected, (state) => {
           state.deleteLoading = true;
       });

       builder.addCase(patchPost.pending, (state, action) => {
           state.patchLoading = !!action.meta.arg;
       });
       builder.addCase(patchPost.fulfilled, (state) => {
           state.patchLoading = false;
       });
       builder.addCase(patchPost.rejected, (state) => {
           state.patchLoading = true;
       });
   }
});

export const postsReducer = PostsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPost = (state: RootState) => state.posts.post;
export const selectLoading = (state: RootState) => state.posts.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.posts.createLoading;
export const selectDeleteLoading = (state: RootState) => state.posts.deleteLoading;
export const selectPatchLoading = (state: RootState) => state.posts.patchLoading;
