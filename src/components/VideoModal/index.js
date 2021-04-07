// hooks
import { useState } from 'react';
// reactstrap/styles
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './VideoModal.css';

const VideoModal = ({ videoId, origin, title }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const modalIframe =
    origin === 'youtube' ? (
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
    ) : (
      <div className="video-responsive">
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=210552`}
          width="1920"
          height="1080"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title={title}
        ></iframe>
      </div>
    );

  return (
    <>
      <Button className="m-2" color="warning" onClick={toggleModal}>
        Play
      </Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} />
        <ModalBody>{modalIframe}</ModalBody>
        <ModalFooter />
      </Modal>
    </>
  );
};

export default VideoModal;
