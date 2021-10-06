import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './postsAPI';

const initialState = {
  value: 0,
  status: 'idle',
  data:  [],
  limit: 0,
  page: 0,
  prevY: 0,
};

export const getPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (page) => {
    const response = await fetchPosts(page);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    changeY: (state, action) => {
      state.prevY = action.payload;
    },
    decrementPage: (state) => {
      state.page -= 1;
    },
    addUserPost: (state, action) => {
      state.data = [ ...action.payload, ...state?.data ];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const newData = action.payload?.posts;
        state.data = [...state?.data, ...newData];
      });
  },
});

export const { incrementPage, decrementPage, changeY, addUserPost } = postsReducer.actions;

//States to export
export const selectData = (state) => state.posts.data;
export const actualPage = (state) => state.posts.page;
export const actualY = (state) => state.posts.prevY

export default postsReducer.reducer;
