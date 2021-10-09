import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPublicComment } from './publicCommentAPI';

const initialState = {
  value: 0,
  status: 'idle',
  data: [],
};

export const setCommentAsync = createAsyncThunk('public/createComment', async (data) => {
  const response = await fetchPublicComment(data);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const commentsReducer = createSlice({
  name: 'publiccomment',
  initialState,
  reducers: {
    restartStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCommentAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setCommentAsync.fulfilled, (state, action) => {
        console.log(action)
        state.status = 'end';
        state.data = action.payload.comments[0];
      });
  },
});

export const { restartStatus } = commentsReducer.actions;

//States to export
export const newComment = (state) => state.publiccomment.data;
export const status = (state) => state.publiccomment.status;

export default commentsReducer.reducer;
