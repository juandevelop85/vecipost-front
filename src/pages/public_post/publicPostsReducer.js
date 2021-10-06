import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPublicPosts } from './publicPostsAPI';

const initialState = {
  value: 0,
  status: 'idle',
  data:  [],
};

export const setPostsAsync = createAsyncThunk(
  'public/createPosts',
  async (data) => {
    const response = await fetchPublicPosts(data);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const postsReducer = createSlice({
  name: 'publicpost',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(setPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = [action.payload?.posts];
      });
  },
});

export const { incrementPage, decrementPage, changeY } = postsReducer.actions;

//States to export
export const newPost = (state) => state.publicpost.data;
export const actualPage = (state) => state.publicpost.page;
export const actualY = (state) => state.publicpost.prevY

export default postsReducer.reducer;
