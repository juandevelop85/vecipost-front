import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../pages/counter/counterSlice';
import postsReducer from '../pages/posts/postsReducer';
import publicPostsReducer from '../pages/public_post/publicPostsReducer';
import postsStatusReducer from '../pages/status/postsStatusReducer';
import generalReducer from '../reducers/generalReducer';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    status: postsStatusReducer,
    general: generalReducer,
    publicpost: publicPostsReducer
  },
});
