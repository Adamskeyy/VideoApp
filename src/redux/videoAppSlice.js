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
// import { fetchVimeoVideoById } from '../api/vimeo';
// youtube endpoint
import { youtubeEndpoint } from '../api/youtube';

// osobno vimeo i youtube?
export const fetchVideoById = createAsyncThunk(
  'videoApp/fetchVideoById',
  (videoId, { dispatch }) => {
    // const originSite = 'youtube';

    axios
      .get(youtubeEndpoint(videoId))
      .then((res) => {
        let videoData = res.data.items[0];
        dispatch(addVideo(videoData));
      })
      .catch((err) => err);

    // if (originSite === 'youtube') {
    //   console.log('fetchuję youtube');
    // }

    // if (originSite === 'vimeo') {
    // fetchVimeoVideoById(videoId);
    //   console.log('fetchuję vimeo');
    // }
  }
);

const videoAppSlice = createSlice({
  name: 'videoApp',
  initialState: {
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
      if (state.originSite === 'youtube') {
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
      if (state.originSite === 'vimeo') {
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
        state.videos = [
          ...state.videos,
          {
            ...video,
          },
        ];
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
      const newOrder = [
        ...state.videos.sort(
          (a, b) =>
            new Date(a.rawDateTime).getTime() -
            new Date(b.rawDateTime).getTime()
        ),
      ];
      state.videos = newOrder;
    },
    sortByNewest: (state) => {
      const newOrder = [
        ...state.videos.sort(
          (a, b) =>
            new Date(b.rawDateTime).getTime() -
            new Date(a.rawDateTime).getTime()
        ),
      ];
      state.videos = newOrder;
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
