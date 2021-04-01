// reactstrap
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
// hooks
import { useState } from 'react';
import { useSelector } from 'react-redux';

const VideoList = () => {
  const videos = useSelector((state) => state.videoApp.videos);
  const [isCardLayout, setIsCardLayout] = useState(false);

  const handleViewToggle = () => {
    setIsCardLayout((prev) => !prev);
  };

  // TODO
  // Zrobić responsywny widok z kafelkami - obecnie wyjeżdżają poza App przy mniejszych szerokościach ekranu

  return (
    <>
      <Button
        className="mt-2 mb-2"
        outline
        type="submit"
        color="secondary"
        onClick={handleViewToggle}
      >
        Change View
      </Button>
      <ListGroup horizontal={isCardLayout}>
        {videos.map((video) => (
          <ListGroupItem key={video.id}>{video.id}</ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};

export default VideoList;
