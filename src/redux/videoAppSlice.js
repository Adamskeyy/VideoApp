// redux
import { createSlice } from '@reduxjs/toolkit';
// axios
import axios from 'axios';

// const youtubeVideo = {
//   id: '',
//   title: '',
//   views: '',
//   likes: '',
//   thumbnail: '',
//   addedAt: '',
// };
// const vimeoVideo = {
//   id: '',
//   title: '',
//   likes: '',
//   thumbnail: '',
//   addedAt: '',
// };

export const videoAppSlice = createSlice({
  name: 'videoApp',
  initialState: {
    youtubeVideos: [],
    vimeoVideos: [],
    error: null,
  },
  reducers: {
    setVideos: (state) => {},
    addVideo: (state, action) => {
      // axios
      //   .get(
      //     `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${action.payload}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      //   )
      //   .then((res) => console.log(res.data.items[0].snippet)) // zapisać wynik w store (localstorage + stan wewnętrzny - context/redux)
      //   .catch((err) => err);
      console.log(action.payload);

      // state.youtubeVideos = [...state.youtubeVideos, { ...newVideo }];
    },
    removeVideo: (state, action) => {},
    clearVideoList: (state, action) => {},
    addToFavourites: (state, action) => {},
    removeFromFavourites: (state, action) => {},
  },
});

export const {
  setVideos,
  addVideo,
  removeVideo,
  clearVideoList,
  addToFavourites,
  removeFromFavourites,
} = videoAppSlice.actions;

export default videoAppSlice.reducer;
