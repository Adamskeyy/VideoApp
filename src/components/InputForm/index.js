// reactstrap
import {
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  FormFeedback,
} from 'reactstrap';
// hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// reducer
import { addVideo } from '../../redux/videoAppSlice';

const InputForm = () => {
  const dispatch = useDispatch();

  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // CHANGE
  const onChange = (e) => {
    setErrorMessage('');
    setInputText(e.target.value);
  };

  // SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    const isInputEmpty = inputText === '';
    // const isInputValid = {};
    if (isInputEmpty) {
      setErrorMessage('You forgot to pass URL!');
      return;
    }
    dispatch(addVideo(inputText));
    setInputText('');
  };

  // TODO: TOGGLOWANIE MIĘDZY YOUTUBE A VIMEO (adekwatna walidacja)

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup className="position-relative">
        <Label for="clipName">Add new clip</Label>
        <Input
          invalid={errorMessage !== ''}
          type="text"
          name="clipName"
          id="clipName"
          placeholder="Paste in clip URL..."
          value={inputText}
          onChange={onChange}
        />
        <FormFeedback tooltip>{errorMessage}</FormFeedback>
      </FormGroup>

      <Button className="mt-2 mb-4" type="submit" color="primary">
        Add Clip
      </Button>
    </Form>
  );
};

export default InputForm;
