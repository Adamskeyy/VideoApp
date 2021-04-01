// redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// axios
import axios from 'axios';
// react moment
import moment from 'moment';

// const vimeoVideo = {
//   id: '',
//   title: '',
//   likes: '',
//   thumbnail: '',
//   addedAt: '',
// };

// const fetchVideoById = createAsyncThunk(
//   'videoApp/fetchById',
//   axios
//     .get(
//       `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
//     )
//     .then((res) => res.data.items[0].snippet)
//     .catch((err) => err)
// );

export const videoAppSlice = createSlice({
  name: 'videoApp',
  initialState: {
    isYoutube: true,
    youtubeVideos: [],
    vimeoVideos: [],
    error: null,
  },
  reducers: {
    switchVideoSite: (state) => {
      state.isYoutube = !state.isYoutube;
    },
    setVideos: (state) => {},
    addVideo: (state, action) => {
      if (state.isYoutube) {
        state.youtubeVideos = [
          ...state.youtubeVideos,
          {
            id: action.payload,
            title: '',
            views: '',
            likes: '',
            thumbnail: '',
            addedAt: moment().format('DD.MM.YYYY, kk:mm'),
            favourite: false,
          },
        ];

        console.log(state.youtubeVideos);
        return;
      }
      state.vimeoVideos = [
        ...state.vimeoVideos,
        {
          id: action.payload,
          title: '',
          views: '',
          likes: '',
          thumbnail: '',
          addedAt: '',
          favourite: false,
        },
      ];
    },
    removeVideo: (state, action) => {},
    clearVideoList: (state) => {
      state.youtubeVideos = [];
      state.vimeoVideos = [];
    },
    addToFavourites: (state, action) => {
      // na podstawie id zmienić pole filmiku isFavourite na true
    },
    removeFromFavourites: (state, action) => {
      // na podstawie id zmienić pole filmiku isFavourite na false
    },
  },
});

export const {
  switchVideoSite,
  setVideos,
  addVideo,
  removeVideo,
  clearVideoList,
  addToFavourites,
  removeFromFavourites,
} = videoAppSlice.actions;

export default videoAppSlice.reducer;
