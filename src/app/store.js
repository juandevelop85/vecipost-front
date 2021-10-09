import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../pages/posts/postsReducer';
import publicPostsReducer from '../pages/public_post/publicPostsReducer';
import publicCommentsReducer from '../pages/public_comments/publicCommentReducer';
import postsStatusReducer from '../pages/status/postsStatusReducer';
import generalReducer from '../reducers/generalReducer';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    status: postsStatusReducer,
    general: generalReducer,
    publicpost: publicPostsReducer,
    publiccomment: publicCommentsReducer,
  },
  devTools: false
});
