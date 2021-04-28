# VideoApp

VideoApp is an application enabling the user access to vimeo and youtube videos of his/her choice in one place.

## Installation

Use the [npm](https://www.npmjs.com/) to install all the necessary dependencies.

```javascript
npm install
```

## Usage

In order to launch application in local environment, user must provide .env.local file in main application directory. It has to contain youtube API key and vimeo access token. Instructions on how to generate them in links below:

- [YouTube API](https://developers.google.com/youtube/v3/getting-started)
- [Vimeo API](https://developer.vimeo.com/api/guides/start)

```
REACT_APP_YOUTUBE_API_KEY={ YOUR_YOUTUBE_API_KEY }
REACT_APP_VIMEO_ACCESS_TOKEN={ VIMEO_ACCESS_TOKEN }
```

With all the dependencies installed and credentials set in .env.local file, you can start using the application by launching script shown below.

```javascript
npm start
```

## Chosen tools

- reduxjs/toolkit:
  - To reduce all the boilerplate code related to basic redux setup
  - To keep action creators and reducers in one place with createSlice function
  - For easier asynchronous redux fetch actions using createAsyncThunk function
- reduxjs/reselect: To extract some logic out of redux store methods with createSelector function and use it inside chosen components
- reactstrap: For faster creation of eye-friendly layout
- date-fns: For easier handling of datetime formats
