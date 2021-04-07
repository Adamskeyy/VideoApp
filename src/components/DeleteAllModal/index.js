// hooks
import { useState } from 'react';
// reactstrap/styles
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// redux
import { useDispatch } from 'react-redux';
import { clearVideoList } from '../../redux/videoAppSlice';

const DeleteAllModal = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => setModal(!modal);

  const deleteAll = () => {
    dispatch(clearVideoList());
    toggleModal();
  };

  return (
    <>
      <Button className="m-2" color="danger" onClick={toggleModal}>
        Delete All
      </Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} />
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button className="m-2" color="danger" onClick={deleteAll}>
            Yes
          </Button>{' '}
          <Button className="m-2" color="secondary" onClick={toggleModal}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeleteAllModal;
