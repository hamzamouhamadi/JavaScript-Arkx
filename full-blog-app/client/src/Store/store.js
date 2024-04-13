import { configureStore } from '@reduxjs/toolkit';
import BlogSlice from '../Slices/BlogSlice';
import UserSlice from '../Slices/UserSlice';

export default configureStore({
  reducer: {
    posts: BlogSlice,
    users : UserSlice
  },
});
