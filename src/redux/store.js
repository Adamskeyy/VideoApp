// redux
import { configureStore } from '@reduxjs/toolkit';
import { fetchVideoById } from './videoAppSlice';
// reducer
import videoAppReducer from './videoAppSlice';

export default configureStore({
  reducer: {
    videoApp: videoAppReducer,
  },
  middleware: (
    getDefaultMiddleware // getting rid of serializablechekc error when handling momentjs objects
  ) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: fetchVideoById,
      },
      serializableCheck: false,
    }),
});
