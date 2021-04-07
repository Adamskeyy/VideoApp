// reactstrap / styles
import {
  Input,
  ButtonGroup,
  Button,
  Form,
  FormGroup,
  FormFeedback,
} from 'reactstrap';
import './InputForm.css';
// hooks
import { useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVideoById,
  setErrorMessage,
  setOriginSite,
} from '../../redux/videoAppSlice';
// validation
import useValidate from '../../hooks/useValidate';

const InputForm = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.videoApp);
  const [inputText, setInputText] = useState('');
  const [inputType, setInputType] = useState('url');
  // validation
  const {
    validateInput,
    getVideoId,
    checkForUniqueId,
    getOriginSiteFromId,
    getOriginSiteFromUrl,
  } = useValidate();

  const onChange = (e) => {
    dispatch(setErrorMessage(''));
    setInputText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validated = validateInput(inputText, inputType);
    let videoId = inputText;
    if (validated && inputType === 'url') {
      videoId = getVideoId(inputText);
    }
    if (validated && checkForUniqueId(videoId)) {
      const origin =
        inputType === 'id'
          ? getOriginSiteFromId(inputText)
          : getOriginSiteFromUrl(inputText);
      dispatch(setOriginSite(origin));
      dispatch(fetchVideoById({ videoId, origin }));
    }
    setInputText('');
  };

  return (
    <Form className="inputForm" onSubmit={onSubmit}>
      <FormGroup>
        <ButtonGroup>
          <Button
            active={inputType === 'url'}
            outline
            onClick={() => setInputType('url')}
          >
            URL
          </Button>
          <Button
            active={inputType === 'id'}
            outline
            onClick={() => setInputType('id')}
          >
            ID
          </Button>
        </ButtonGroup>
      </FormGroup>
      <div className="inputRow m-2">
        <FormGroup className="position-relative inputBox">
          <Input
            invalid={errorMessage !== ''}
            type="text"
            name="clipName"
            id="clipName"
            placeholder={`Paste in clip ${inputType}...`}
            value={inputText}
            onChange={onChange}
          />
          <FormFeedback tooltip>{errorMessage}</FormFeedback>
        </FormGroup>
        <Button
          className="submitButton ml-2 mr-2 mb-2"
          type="submit"
          color="primary"
        >
          Add Clip
        </Button>
      </div>
    </Form>
  );
};

export default InputForm;
