import { createSelector } from 'reselect';
import { OLDEST, NEWEST } from './videoAppSlice';

const videosSelector = (state) => state.videoApp.videos;

const sortTypeSelector = (state) => state.videoApp.sortType;

export const videoSortSelector = createSelector(
  videosSelector,
  sortTypeSelector,
  (videos, sortType) => {
    if (sortType === OLDEST) {
      const sortedByOldest = [...videos].sort(
        (a, b) =>
          new Date(a.rawDateTime).getTime() - new Date(b.rawDateTime).getTime()
      );
      return sortedByOldest;
    }
    if (sortType === NEWEST) {
      const sortedByNewest = [...videos].sort(
        (a, b) =>
          new Date(b.rawDateTime).getTime() - new Date(a.rawDateTime).getTime()
      );
      return sortedByNewest;
    }
  }
);
