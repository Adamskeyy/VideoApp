/* eslint-disable no-duplicate-case */
// action types
import * as actionTypes from '../actions/actionTypes';

// const youtubeVideo = {
//   title: '',
//   views: '',
//   likes: '',
//   thumbnail: '',
//   addedAt: '',
// };
// const vimeoVideo = {
//   title: '',
//   likes: '',
//   thumbnail: '',
//   addedAt: '',
// };

const initialState = {
  youtubeVideos: [],
  vimeoVideos: [],
  error: null,
};

const setVideos = (state, action) => {};
const addVideo = (state, action) => {};
const removeVideo = (state, action) => {};
const clearVideoList = (state, action) => {};
const addToFavourites = (state, action) => {};
const removeFromFavourites = (state, action) => {};

// TODO: createSlice

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VIDEOS:
      return setVideos(state, action);
    case actionTypes.ADD_VIDEO:
      return addVideo(state, action);
    case actionTypes.REMOVE_VIDEO:
      return removeVideo(state, action);
    case actionTypes.CLEAR_VIDEO_LIST:
      return clearVideoList(state, action);
    case actionTypes.ADD_TO_FAVOURITES:
      return addToFavourites(state, action);
    case actionTypes.REMOVE_FROM_FAVOURITES:
      return removeFromFavourites(state, action);
    default:
      return state;
  }
};

export default reducer;
