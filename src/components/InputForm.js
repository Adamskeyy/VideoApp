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

const InputForm = () => {
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChange = (e) => setInputText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    const isInputEmpty = e.target.value !== 'undefined';
    // const isInputValid = {};

    console.log(isInputEmpty);

    if (isInputEmpty) {
      setErrorMessage('You forgot to pass URL!');
    }
    console.log(inputText);
    setInputText((prev) => '');
  };

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
