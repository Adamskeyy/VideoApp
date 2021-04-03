// hooks
import { useState } from 'react';
// reactstrap/styles
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';

const CustomVideoListModal = () => {
  const [modal, setModal] = useState(false);
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleModal = () => setModal(!modal);

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
    // dispatch(fetchVideoById(inputText));
    setInputText('');
  };

  return (
    <div>
      <Button className="m-2" color="primary" onClick={toggleModal}>
        Upload video URL list...
      </Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} />
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup className="position-relative">
              <Label for="clipName">Add array of clips:</Label>
              <Input
                className="mb-4"
                invalid={errorMessage !== ''}
                type="textarea"
                name="clipName"
                id="clipName"
                placeholder="Paste in list of IDs or URLs..."
                value={inputText}
                onChange={onChange}
              />
              <FormFeedback tooltip>{errorMessage}</FormFeedback>
            </FormGroup>

            <Button
              className="m-2"
              color="primary"
              type="submit"
              onClick={() => console.log('Videos uploaded!')}
            >
              Upload clip list...
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter />
      </Modal>
    </div>
  );
};

export default CustomVideoListModal;
