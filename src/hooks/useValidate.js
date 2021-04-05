import { useSelector } from 'react-redux';

const useValidate = () => {
  const videos = useSelector((state) => state.videoApp.videos);

  const validateYouTubeUrl = (url) => {
    const regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(regExp)) {
      return true;
    }
    return false;
  };

  const validateVimeoUrl = (url) => {
    const regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
    if (url.match(regExp)) {
      return true;
    }
    return false;
  };

  const validateUrl = (url) => {
    if (validateYouTubeUrl(url) || validateVimeoUrl(url)) {
      console.log('yt: ', validateYouTubeUrl(url));
      console.log('vimeo: ', validateVimeoUrl(url));
      return true;
    }
    return 'Invalid Video URL!';
  };

  const getVideoId = (url) => {
    const video_id_regExp = /^.*((youtu.be\/|vimeo.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\\&\\?]*).*/;
    const match = url.match(video_id_regExp);
    const videoId = match[7];
    return videoId;
  };

  const validateInput = (inputText, inputType) => {
    const isInputEmpty = inputText === '';
    const isInputLengthCorrect = inputText.length === 11;
    let errorMessage;

    if (isInputEmpty) {
      errorMessage = 'You forgot to pass something!';
      return;
    }
    if (inputType === 'id' && !isInputLengthCorrect) {
      errorMessage = 'Incorrect input length!';
      return;
    }
    // youtube url check
    // if (inputType === 'url' && !validateYouTubeUrl(inputText)) {
    //   setErrorMessage('Incorrect Youtube URL!');
    //   return;
    // }
    // vimeo url check
    if (inputType === 'url' && !validateVimeoUrl(inputText)) {
      errorMessage = 'Incorrect Vimeo URL!';
      return;
    }

    // if (inputType === 'url') {
    //   id = getYouTubeVideoId(inputText);
    // }

    // check if id in state
    if (videos.map((video) => video.id === inputText)) {
      errorMessage = 'Video already in database!';
    }

    return errorMessage || true;
  };

  return {
    validateUrl,
    getVideoId,
    validateInput,
  };
};

export default useValidate;
