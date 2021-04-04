const storeVideo = (video) => {
  let videos;
  if (localStorage.getItem('videos') === null) {
    videos = [];
    videos.push(video);
    localStorage.setItem('videos', JSON.stringify(videos));
  } else {
    videos = JSON.parse(localStorage.getItem('videos'));
    videos.push(video);
    localStorage.setItem('videos', JSON.stringify(videos));
  }
};

const getVideosFromStorage = () => {
  let videos;
  if (localStorage.getItem('videos') === null) {
    videos = [];
  } else {
    videos = JSON.parse(localStorage.getItem('videos'));
  }
  return videos;
};

const updateVideoInStorage = (updatedVideo) => {
  let videos = JSON.parse(localStorage.getItem('videos'));

  videos.forEach((video, index) => {
    if (updatedVideo.id === video.id) {
      videos.splice(index, 1, updatedVideo);
    }
  });
  localStorage.setItem('videos', JSON.stringify(videos));
};

const deleteVideoFromStorage = (id) => {
  let videos = JSON.parse(localStorage.getItem('videos'));

  videos.forEach((video, index) => {
    if (id === video.id) {
      videos.splice(index, 1);
    }
  });
  localStorage.setItem('videos', JSON.stringify(videos));
};

const clearVideosFromStorage = () => {
  localStorage.removeItem('videos');
};

export {
  storeVideo,
  getVideosFromStorage,
  updateVideoInStorage,
  deleteVideoFromStorage,
  clearVideosFromStorage,
};
