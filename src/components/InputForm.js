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
// API
import youtubeAPI from '../api/youtube';
// axios
import axios from 'axios';

const InputForm = () => {
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // CHANGE
  const onChange = (e) => {
    setErrorMessage('');
    setInputText(e.target.value);
  };

  // MAKE YOUTUBE API REQUEST USING VIDEO ID
  const onSearch = async (keyword) => {
    const response = await youtubeAPI.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        q: keyword,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    });

    console.log(response.data.items);
  };

  // SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    const isInputEmpty = inputText === '';
    // const isInputValid = {};
    if (isInputEmpty) {
      setErrorMessage('You forgot to pass URL!');
    }

    // onSearch(inputText);
    // TODO - stworzyć customową metodę do fetchowania (hook?)
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${inputText}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      )
      .then((res) => console.log(res.data.items[0].snippet.title))
      .catch((err) => console.log(err));

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
