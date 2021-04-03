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
} from '../hooks/useLocalStorage';

export const fetchVideoById = createAsyncThunk(
  'videoApp/fetchVideoById',
  (videoId, { dispatch }) => {
    // wstrzykiwać do geta URL na podstawie inputu - dostosować do vimeo/youtube i podać ID + klucz
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet,statistics`
      )
      .then((res) => {
        let videoData = res.data.items[0];
        dispatch(addVideo(videoData));
      })
      .catch((err) => err);
  }
);

const videoAppSlice = createSlice({
  name: 'videoApp',
  initialState: {
    isYoutube: true,
    videos: [],
    error: null,
    loading: false,
  },
  reducers: {
    switchVideoSite: (state) => {
      state.isYoutube = !state.isYoutube;
    },
    fetchVideos: (state) => {
      state.videos = getVideosFromStorage();
    },
    addVideo: (state, { payload }) => {
      // check if videoid already in state
      // create error message if it is and pass it to input
      let video;
      // youtube videos
      if (state.isYoutube) {
        video = {
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
      video = {
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
  switchVideoSite,
  fetchVideos,
  addVideo,
  removeVideo,
  clearVideoList,
  toggleFavourite,
  sortByNewest,
  sortByOldest,
} = videoAppSlice.actions;

export default videoAppSlice.reducer;
