export const vimeoEndpoint = (videoId) =>
`https://api.vimeo.com/videos/${videoId}?page=1&per_page=10&fields=uri%2C%20name%2C%20description%2C%20duration%2C%20created_time%2C%20modified_time`;
