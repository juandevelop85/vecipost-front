import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../pages/counter/counterSlice';
import postsReducer from '../pages/posts/postsReducer';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer
  },
});
