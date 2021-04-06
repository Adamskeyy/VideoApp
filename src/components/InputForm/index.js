// reactstrap
import { Input, Button, Form, FormGroup, FormFeedback } from 'reactstrap';
// hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// redux
import { fetchVideoById, setErrorMessage } from '../../redux/videoAppSlice';
// validation
import useValidate from '../../hooks/useValidate';

const InputForm = () => {
  const dispatch = useDispatch();
  const { errorMessage, originSite } = useSelector((state) => state.videoApp);
  const [inputText, setInputText] = useState('');
  const [inputType, setInputType] = useState('id');
  // validation
  const { validateInput, getVideoId, checkForUniqueId } = useValidate();

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
      console.log('fetch');
      console.log(originSite);
      dispatch(fetchVideoById(videoId));
    }
    setInputText('');
  };

  return (
    <Form style={{ width: '60%', margin: '0 auto' }} onSubmit={onSubmit}>
      <FormGroup>
        <Input
          type="select"
          name="select"
          id="inputTypeSelect"
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="id">ID</option>
          <option value="url">URL</option>
        </Input>
      </FormGroup>
      <FormGroup className="position-relative">
        <Input
          className="mb-4"
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
      <Button className="m-2" type="submit" color="primary">
        Add Clip
      </Button>
    </Form>
  );
};

export default InputForm;
