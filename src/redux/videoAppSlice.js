// redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// axios
import axios from 'axios';
// date-fns
import { format } from 'date-fns';
// local storage methods
import {
  storeVideo,
  getVideosFromStorage,
  updateVideoInStorage,
  deleteVideoFromStorage,
  clearVideosFromStorage,
} from '../helpers/localStorage';
// vimeo endpoint
import { vimeoEndpoint } from '../api/vimeo';
// youtube endpoint
import { youtubeEndpoint } from '../api/youtube';
// constants
export const OLDEST = 'oldest';
export const NEWEST = 'newest';
export const VIMEO = 'vimeo';
export const YOUTUBE = 'youtube';

export const fetchVideoById = createAsyncThunk(
  'videoApp/fetchVideoById',
  ({ videoId, origin }, { dispatch }) => {
    if (origin === YOUTUBE) {
      axios
        .get(youtubeEndpoint(videoId))
        .then((res) => {
          let videoData = res.data.items[0];
          dispatch(addVideo(videoData));
        })
        .catch((err) => {
          // to improve
          if (err) {
            dispatch(setErrorMessage('Video not found!'));
          }
        });
    }

    if (origin === VIMEO) {
      axios
        .get(vimeoEndpoint(videoId), {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`,
          },
        })
        .then((res) => {
          let videoData = { ...res.data, videoId };
          dispatch(addVideo(videoData));
        })
        .catch((err) => {
          // to improve
          if (err) {
            dispatch(setErrorMessage('Video not found!'));
          }
        });
    }
  }
);

const videoAppSlice = createSlice({
  name: 'videoApp',
  initialState: {
    sortType: NEWEST,
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
      if (state.originSite === YOUTUBE) {
        video = {
          origin: state.originSite,
          id: payload.id,
          title: payload.snippet.title,
          views: payload.statistics.viewCount,
          likes: payload.statistics.likeCount,
          thumbnail: payload.snippet.thumbnails.medium.url,
          rawDateTime: new Date(),
          addedAt: format(new Date(), 'dd.MM.yyyy, kk:mm').toString(),
          favourite: false,
        };
        state.videos.push(video);
        storeVideo(video);
      }
      if (state.originSite === VIMEO) {
        video = {
          origin: state.originSite,
          id: payload.videoId,
          title: payload.name,
          likes: payload.metadata.connections.likes.total,
          thumbnail: payload.pictures.sizes[0].link,
          rawDateTime: new Date(),
          addedAt: format(new Date(), 'dd.MM.yyyy, kk:mm').toString(),
          favourite: false,
        };
        state.videos.push(video);
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
