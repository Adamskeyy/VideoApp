export const youtubeEndpoint = (videoId) =>
  `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet,statistics`;
