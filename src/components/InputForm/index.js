// reactstrap
import { Input, Button, Form, FormGroup, FormFeedback } from 'reactstrap';
// hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// redux
import { fetchVideoById } from '../../redux/videoAppSlice';
// validation
import useValidate from '../../hooks/useValidate';

const InputForm = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const [inputType, setInputType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // validation
  const { validateUrl, getVideoId, validateInput } = useValidate();

  const onChange = (e) => {
    setErrorMessage('');
    setInputText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(validateUrl(inputText));
    // console.log(getVideoId(inputText));
    // if (ValidateInput()) {
    //   console.log('przeszło');
    // podać vimeo/youtube
    dispatch(fetchVideoById(inputText));
    // }

    setInputText('');
  };

  return (
    <Form style={{ width: '60%', margin: '0 auto' }} onSubmit={onSubmit}>
      <FormGroup>
        <Input
          type="select"
          name="select"
          id="inputTypeSelect"
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
