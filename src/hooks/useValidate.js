// redux
import { useSelector, useDispatch } from 'react-redux';
import { setErrorMessage, setOriginSite } from '../redux/videoAppSlice';

const useValidate = () => {
  const videos = useSelector((state) => state.videoApp.videos);
  const dispatch = useDispatch();

  const validateYouTubeUrl = (url) => {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/;
    if (url.match(regExp)) {
      return true;
    }
    return false;
  };

  const validateVimeoUrl = (url) => {
    const regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
    if (url.match(regExp)) {
      return true;
    }
    return false;
  };

  const isUrlValid = (url) => {
    if (validateYouTubeUrl(url)) {
      dispatch(setOriginSite('youtube'));
      return true;
    }
    if (validateVimeoUrl(url)) {
      dispatch(setOriginSite('vimeo'));
      return true;
    }
    dispatch(setErrorMessage('Invalid Video URL!'));
    return false;
  };

  const isIdValid = (id) => {
    const numbersOnlyString = /^\d+$/.test(id);
    // if id doesn't contain only numbers and its length === 11 it's youtube id
    if (id.length === 11 && !numbersOnlyString) {
      dispatch(setOriginSite('youtube'));
      return true;
    }
    // if id contain purely numbers it's vimeo id
    if (numbersOnlyString) {
      dispatch(setOriginSite('vimeo'));
      return true;
    }
    dispatch(setErrorMessage('Invalid Video ID!'));
    return false;
  };

  const checkForUniqueId = (id) => {
    if (videos.some((video) => video.id === id)) {
      dispatch(setErrorMessage('Video already in database!'));
      return false;
    }
    return true;
  };

  const validateInput = (inputText, inputType) => {
    const isInputEmpty = inputText === '';
    if (isInputEmpty) {
      dispatch(setErrorMessage('You forgot to pass something!'));
      return false;
    }

    if (inputType === 'id') {
      return isIdValid(inputText);
    }

    if (inputType === 'url') {
      return isUrlValid(inputText);
    }
  };

  // get Id if input === url
  const getVideoId = (url) => {
    const videoIdRegExp = /^.*((youtu.be\/|vimeo.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\\&\\?]*).*/;
    const match = url.match(videoIdRegExp);
    const videoId = match[7];
    return videoId;
  };

  return {
    validateInput,
    getVideoId,
    checkForUniqueId,
  };
};

export default useValidate;
