// reactstrap / styles
import { ListGroup, Button } from 'reactstrap';
import './VideoList.css';
// hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// redux
import { fetchVideos, clearVideoList } from '../../redux/videoAppSlice';
// components
import VideoCard from './VideoCard';
import SortBy from '../SortBy';

const VideoList = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videoApp.videos);
  const [isCardLayout, setIsCardLayout] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);

  const handleViewToggle = () => {
    setIsCardLayout((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const toggleFavourites = () => {
    setShowFavourites((prev) => !prev);
  };

  let taskItemClasses = 'fa fa-star';
  if (showFavourites) {
    taskItemClasses = 'fa fa-star checked';
  }

  let videosToDisplay = [...videos];
  if (showFavourites) {
    videosToDisplay = videos.filter((video) => video.favourite);
  }

  const controlButtons = (
    <>
      <Button
        className="mt-2 mb-2 mr-2"
        outline
        color="secondary"
        onClick={handleViewToggle}
      >
        Change View
      </Button>
      <Button onClick={toggleFavourites} color="secondary">
        <span className={taskItemClasses}></span>
      </Button>
      <SortBy />
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
      {videosToDisplay.length ? controlButtons : null}
      {/*Zrobić responsywny widok z kafelkami - obecnie wyjeżdżają poza App przy mniejszych szerokościach ekranu */}
      <ListGroup horizontal={isCardLayout}>
        {videosToDisplay.length ? (
          videosToDisplay.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))
        ) : (
          <p>There is nothing to display!</p>
        )}
      </ListGroup>
    </>
  );
};

export default VideoList;
