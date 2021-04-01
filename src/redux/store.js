// redux
import { configureStore } from '@reduxjs/toolkit';
// reducer
import videoAppReducer from './videoAppSlice';

export default configureStore({
  reducer: {
    videoApp: videoAppReducer,
  },
});
