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
import { fetchVideoById } from '../../redux/videoAppSlice';

const InputForm = () => {
  const dispatch = useDispatch();

  // TODO: na podstawie inputu zwalidować o jaką stronę chodzi i "wyciągnąć" id z adresu
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // let re = new RegExp('^(https://www.youtube.com/watch?v=|https://youtu.be/)(.+)$');

  const onChange = (e) => {
    setErrorMessage('');
    setInputText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isInputEmpty = inputText === '';
    // const isInputValid = {};
    if (isInputEmpty) {
      setErrorMessage('You forgot to pass something!');
      return;
    }
    dispatch(fetchVideoById(inputText));
    setInputText('');
  };

  return (
    <Form style={{ width: '60%', margin: '0 auto' }} onSubmit={onSubmit}>
      <FormGroup className="position-relative">
        <Label for="clipName">Add new clip:</Label>
        <Input
          className="mb-4"
          invalid={errorMessage !== ''}
          type="text"
          name="clipName"
          id="clipName"
          placeholder="Paste in clip ID or URL..."
          value={inputText}
          onChange={onChange}
        />
        <FormFeedback style={{ margin: '0 auto' }} tooltip>
          {errorMessage}
        </FormFeedback>
      </FormGroup>
      <Button className="m-2" type="submit" color="primary">
        Add Clip
      </Button>
    </Form>
  );
};

export default InputForm;
