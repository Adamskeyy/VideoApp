// reactstrap
import { ListGroup, Button } from 'reactstrap';
// hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// redux
import { fetchVideos, clearVideoList } from '../../redux/videoAppSlice';
// components
import VideoCard from './VideoCard';

const VideoList = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videoApp.videos);
  const [isCardLayout, setIsCardLayout] = useState(false);

  const handleViewToggle = () => {
    setIsCardLayout((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const controlButtons = (
    <>
      <Button
        className="mt-2 mb-2"
        outline
        color="secondary"
        onClick={handleViewToggle}
      >
        Change View
      </Button>
      <Button
        className="mt-2 mb-2"
        color="danger"
        onClick={() => dispatch(clearVideoList())}
      >
        Delete All
      </Button>
    </>
  );

  return (
    <>
      {videos.length ? controlButtons : null}
      {/*Zrobić responsywny widok z kafelkami - obecnie wyjeżdżają poza App przy mniejszych szerokościach ekranu */}
      <ListGroup horizontal={isCardLayout}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </ListGroup>
    </>
  );
};

export default VideoList;
