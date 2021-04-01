// redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// axios
import axios from 'axios';
// moment
import moment from 'moment';
// local storage methods
import {
  storeVideo,
  getVideosFromStorage,
  updateVideoInStorage,
  deleteVideoFromStorage,
  clearVideosFromStorage,
} from '../localStorage';

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
    videos: [],
    error: null,
  },
  reducers: {
    switchVideoSite: (state) => {
      state.isYoutube = !state.isYoutube;
    },
    fetchVideos: (state) => {
      console.log(getVideosFromStorage());
    },
    setVideos: (state) => {
      // wrzuć filmiki ze stanu do local storage
    },
    addVideo: (state, action) => {
      let video;
      // youtube videos
      if (state.isYoutube) {
        video = {
          id: action.payload,
          title: '',
          views: '',
          likes: '',
          thumbnail: '',
          addedAt: moment().format('DD.MM.YYYY, kk:mm'),
          favourite: false,
        };
        state.videos = [
          ...state.videos,
          {
            ...video,
          },
        ];
        // store in local storage
        storeVideo(video);
        console.log(state.videos);
        return;
      }
      // vimeo videos - zredukować kod (DRY)
      video = {
        id: action.payload,
        title: '',
        likes: '',
        thumbnail: '',
        addedAt: moment().format('DD.MM.YYYY, kk:mm'),
        favourite: false,
      };
      state.videos = [
        ...state.videos,
        {
          ...video,
        },
      ];
      storeVideo(video);
    },
    removeVideo: (state, action) => {
      // odflitrować dany rekord na podstawie id
    },
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
  fetchVideos,
  setVideos,
  addVideo,
  removeVideo,
  clearVideoList,
  addToFavourites,
  removeFromFavourites,
} = videoAppSlice.actions;

export default videoAppSlice.reducer;
