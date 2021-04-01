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

const fetchVideoById = createAsyncThunk('videoApp/fetchById', (videoId) => {
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    )
    .then((res) => res.data.items[0].snippet)
    .catch((err) => err);
});

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
      state.videos = getVideosFromStorage();
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
      deleteVideoFromStorage(action.payload);
    },
    clearVideoList: (state) => {
      state.videos = [];
      clearVideosFromStorage();
    },
    addToFavourites: (state, action) => {
      // na podstawie id zmienić pole filmiku isFavourite na true
      updateVideoInStorage();
    },
    removeFromFavourites: (state, action) => {
      // na podstawie id zmienić pole filmiku isFavourite na false
      updateVideoInStorage();
    },
  },
});

export const {
  switchVideoSite,
  fetchVideos,
  addVideo,
  removeVideo,
  clearVideoList,
  addToFavourites,
  removeFromFavourites,
} = videoAppSlice.actions;

export default videoAppSlice.reducer;
