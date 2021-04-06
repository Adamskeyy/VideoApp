export const vimeoEndpoint = (videoId) =>
  `https://api.vimeo.com/videos/${videoId}?fields=metadata%2C%20pictures%2C%20name&sizes=295x166`;
