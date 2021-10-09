import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchLikeEvent } from './postsAPI';

const initialState = {
  status: 'idle',
  data: [],
  limit: 0,
  page: 0,
  prevY: 0,
};

export const likeEvent = createAsyncThunk('public/createEvent', async (data) => {
  const response = await fetchLikeEvent(data);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

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
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
    restartStatus: (state) => {
      state.status = 'idle';
    },
    restartState: () => initialState,
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
      .addCase(likeEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(likeEvent.fulfilled, (state, action) => {
        
        let status = action.payload.status;
        if (status === 'SUCCESS') {
          const newDataPost = action.payload.posts[0];
          let index = state.data.findIndex((post) => post.id === newDataPost.id);
          index = index !== -1 ? index : 0;
          const newState = [...state.data];
          
          newState[index] = {
            ...state.data[index],
            ...newDataPost,
          };
          state.data = newState;
          console.log(state)
        }
        state.status = 'end';
      });
  },
});

export const { incrementPage, decrementPage, changeY, addUserPost, updatePosts, addPosts, restartState, changeStatus, restartStatus } = postsReducer.actions;

//States to export
export const selectData = (state) => state.posts.data;
export const actualPage = (state) => state.posts.page;
export const actualY = (state) => state.posts.prevY;
export const status = (state) => state.posts.status;

export const getPostsAsync = (page) => (dispatch, getState) => {
  fetchPosts(page).then((success) => {
    let status = success.status;
    if (status === 'SUCCESS') {
      dispatch(addPosts(success));
    }
  });
};

export default postsReducer.reducer;
