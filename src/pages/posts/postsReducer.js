import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchLikeEvent } from './postsAPI';

const initialState = {
  value: 0,
  status: 'idle',
  data: [],
  limit: 0,
  page: 0,
  prevY: 0,
};

export const getPostsAsync = createAsyncThunk('posts/fetchPosts', async (page) => {
  const response = await fetchPosts(page);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

// export const likeEvent = createAsyncThunk('posts/likeEvent', async (payload) => {
//   const response = await fetchLikeEvent(payload);
//   // The value we return becomes the `fulfilled` action payload
//   return response;
// });

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
      state.data = [...action.payload, ...state?.data];
    },
    addPosts: (state, action) => {
      const newData = action.payload.posts;
      let posts = state.data.concat(newData);
      state.data = posts;
    },
    updatePosts: (state, action) => {
      let index = state.data.findIndex((post) => post.id === action.payload.id);
      index = index !== -1 ? index : 0;
      const newState = [...state.data];

      newState[index] = {
        ...state.data[index],
        ...action.payload,
      };
      state.data = newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const newData = action.payload?.posts;
        let posts = state.data.concat(newData);
        state.data = posts;
      });
  },
});

export const { incrementPage, decrementPage, changeY, addUserPost, updatePosts, addPosts } = postsReducer.actions;

//States to export
export const selectData = (state) => state.posts.data;
export const actualPage = (state) => state.posts.page;
export const actualY = (state) => state.posts.prevY;


export const likeEvent = (payload) => (dispatch, getState) => {
  fetchLikeEvent(payload).then((success) => {
    let status = success.status;
    if (status === 'SUCCESS') {
      const newDataPost = success.posts[0];
      dispatch(updatePosts(newDataPost));
    }
  });
};


export default postsReducer.reducer;
