// reactstrap
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
// hooks
import { useState } from 'react';

const VideoList = () => {
  // fetch videos from storage
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
        <ListGroupItem>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Morbi leo risus</ListGroupItem>
        <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup>
    </>
  );
};

export default VideoList;
