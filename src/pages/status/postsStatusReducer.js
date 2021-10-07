import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPostsDetail } from './postsStatusAPI';

const initialState = {
  value: 0,
  status: 'idle',
  comments: [],
};

export const getPostDetailAsync = createAsyncThunk('status/fetchPostsDetail', async (page) => {
  const response = await fetchPostsDetail(page);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const postsDetailReducer = createSlice({
  name: 'status',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      state.page -= 1;
    },
    updatePost: (state, action) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostDetailAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPostDetailAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comments = action.payload?.comments;
      });
  },
});

export const { incrementPage, decrementPage, updatePost } = postsDetailReducer.actions;

export const comments = (state) => state.status.comments;

export const updateDataPost = (payload) => (dispatch) => {
  dispatch(updatePost(payload));
};

export default postsDetailReducer.reducer;
