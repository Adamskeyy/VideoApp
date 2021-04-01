export const storeVideo = (video) => {
  let videos;
  // Check if any videos in LS
  if (localStorage.getItem('videos') === null) {
    videos = [];
    // Push new video
    videos.push(video);
    // Set LS
    localStorage.setItem('videos', JSON.stringify(videos));
  } else {
    // Get what is already in LS
    videos = JSON.parse(localStorage.getItem('videos'));
    // Push new video
    videos.push(video);
    // reset LS
    localStorage.setItem('videos', JSON.stringify(videos));
  }
};

export const getVideosFromStorage = () => {
  let videos;
  if (localStorage.getItem('videos') === null) {
    videos = [];
  } else {
    videos = JSON.parse(localStorage.getItem('videos'));
  }
  return videos;
};

export const updateVideoInStorage = (updatedItem) => {
  let videos = JSON.parse(localStorage.getItem('videos'));

  videos.forEach((item, index) => {
    if (updatedItem.id === item.id) {
      videos.splice(index, 1, updatedItem);
    }
  });
  localStorage.setItem('videos', JSON.stringify(videos));
};

export const deleteVideoFromStorage = (id) => {
  let videos = JSON.parse(localStorage.getItem('videos'));

  videos.forEach((item, index) => {
    if (id === item.id) {
      videos.splice(index, 1);
    }
  });
  localStorage.setItem('videos', JSON.stringify(videos));
};

export const clearVideosFromStorage = () => {
  localStorage.removeItem('videos');
};
