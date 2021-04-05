import vimeo from 'vimeo';

const Vimeo = vimeo.Vimeo;

export const fetchVimeoVideoById = (videoId) => {
  const client = new Vimeo(
    `${process.env.REACT_APP_VIMEO_CLIENT_ID}`,
    `${process.env.REACT_APP_VIMEO_CLIENT_SECRET}`,
    `${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`
  );

  client.request(
    {
      method: 'GET',
      path: `/videos/${videoId}`,
      query: {
        page: 1,
        per_page: 10,
        fields: 'uri,name, description, duration,created_time,modified_time',
      },
    },
    (error, body, status_code, headers) => {
      if (error) {
        console.log(error);
        return error;
      }

      console.log(body);
      return body;
    }
  );
};
