// hooks
import { useState } from 'react';
// reactstrap/styles
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './VideoModal.css';

const VideoModal = ({ videoId }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  return (
    <div>
      <Button className="mt-3 mb-2" color="danger" onClick={toggleModal}>
        Play
      </Button>
      <Modal onClick={toggleModal} isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} />
        <ModalBody>
          <div className="video-responsive">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </ModalBody>
        <ModalFooter />
      </Modal>
    </div>
  );
};

export default VideoModal;
