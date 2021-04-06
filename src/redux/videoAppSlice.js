// redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';
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
} from '../helpers/localStorage';
// fetchVimeo
import { fetchVimeoVideoById } from '../api/vimeo';
// youtube endpoint
import { youtubeEndpoint } from '../api/youtube';

export const OLDEST = 'oldest';
export const NEWEST = 'newest';
export const VIMEO = 'vimeo';
export const YOUTUBE = 'youtube';

// osobno vimeo i youtube?
export const fetchVideoById = createAsyncThunk(
  'videoApp/fetchVideoById',
  ({videoId, origin}, { dispatch }) => {

    if (origin === YOUTUBE) {
    axios
      .get(youtubeEndpoint(videoId))
      .then((res) => {
        let videoData = res.data.items[0];
        dispatch(addVideo(videoData));
      })
      .catch((err) => err);
    }

    if (origin === VIMEO) {
      const vimeoResponse = fetchVimeoVideoById(videoId);
      console.log(vimeoResponse);

      axios.get(`https://api.vimeo.com/videos/${videoId}?page=1&per_page=10&fields=uri%2C%20name%2C%20description%2C%20duration%2C%20created_time%2C%20modified_time`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`
      }
      }).then(res => console.log(res)).catch(err => console.log(err))

      // Access-Control-Allow-Credentials: true

    }
  }
);



const videoAppSlice = createSlice({
  name: 'videoApp',
  initialState: {
    sortType: OLDEST,
    originSite: '',
    videos: [],
    errorMessage: '',
    loading: false,
  },
  reducers: {
    fetchVideos: (state) => {
      state.videos = getVideosFromStorage();
    },
    addVideo: (state, { payload }) => {
      let video;
      // youtube videos
      if (state.originSite === YOUTUBE) {
        video = {
          origin: state.originSite,
          id: payload.id,
          title: payload.snippet.title,
          views: payload.statistics.viewCount,
          likes: payload.statistics.likeCount,
          thumbnail: payload.snippet.thumbnails.medium.url,
          rawDateTime: moment(),
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
        return;
      }
      // vimeo videos - zredukować kod (DRY)
      if (state.originSite === VIMEO) {
        video = {
          origin: state.originSite,
          id: payload.id,
          title: '',
          likes: '',
          thumbnail: '',
          rawDateTime: moment(),
          addedAt: moment().format('DD.MM.YYYY, kk:mm'),
          favourite: false,
        };
        state.videos.push(video)
        storeVideo(video);
      }
    },
    removeVideo: (state, { payload }) => {
      deleteVideoFromStorage(payload);
      state.videos = [...state.videos.filter(({ id }) => id !== payload)];
    },
    clearVideoList: (state) => {
      state.videos = [];
      clearVideosFromStorage();
    },
    toggleFavourite: (state, { payload }) => {
      updateVideoInStorage(payload);
      state.videos.forEach((video, index) => {
        if (payload.id === video.id) {
          state.videos.splice(index, 1, payload);
        }
      });
    },
    sortByOldest: (state) => {
      state.sortType = OLDEST;
    },
    sortByNewest: (state) => {
      state.sortType = NEWEST;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setOriginSite: (state, action) => {
      state.originSite = action.payload;
    },
  },
  extraReducers: {
    [fetchVideoById.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchVideoById.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [fetchVideoById.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  fetchVideos,
  addVideo,
  removeVideo,
  clearVideoList,
  toggleFavourite,
  sortByNewest,
  sortByOldest,
  setErrorMessage,
  setOriginSite,
} = videoAppSlice.actions;

export default videoAppSlice.reducer;
