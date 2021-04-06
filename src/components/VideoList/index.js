// reactstrap / styles
import { ListGroup, Button } from 'reactstrap';
import PaginationComponent from 'react-reactstrap-pagination';
import './VideoList.css';
// hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// redux
import { fetchVideos, clearVideoList } from '../../redux/videoAppSlice';
// selectors
import { videoSortSelector } from '../../redux/selectors'
// components
import VideoCard from '../VideoCard';
import SortBy from '../SortBy';
// variables
const ITEMS_PER_PAGE = 3;

const VideoList = () => {
  // video state
  const dispatch = useDispatch();
  // const videos = useSelector(state => state.videoApp.videos);
  const videos = useSelector(videoSortSelector);

  // UI state
  const [isCardLayout, setIsCardLayout] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  // pagination
  const [selectedPage, setSelectedPage] = useState(1);
  const from = (selectedPage - 1) * ITEMS_PER_PAGE;
  const to = selectedPage * ITEMS_PER_PAGE;
  const videosToDisplay = videos.filter((v) => !showFavourites || v.favourite);
  const videosOnCurrentPage = videosToDisplay.slice(from, to);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const handleSelected = (selectedPage) => {
    setSelectedPage(selectedPage);
  };

  const handleFavouriteFilter = () => {
    setShowFavourites((prev) => !prev);
  };

  let favouriteIconClasses = 'fa fa-star';
  if (showFavourites) {
    favouriteIconClasses = 'fa fa-star checked';
  }

  const videoList = videosToDisplay.length ? (
    <ListGroup horizontal={isCardLayout}>
      {videosOnCurrentPage.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </ListGroup>
  ) : (
    <p>There is nothing to display!</p>
  );

  const controlButtons = (
    <div>
      <Button
        className="m-2"
        outline
        color="secondary"
        onClick={() => setIsCardLayout((prev) => !prev)}
      >
        Change View
      </Button>
      <Button className="m-2" onClick={handleFavouriteFilter} color="secondary">
        <span className={favouriteIconClasses}></span>
      </Button>
      <Button
        className="m-2"
        color="danger"
        onClick={() => dispatch(clearVideoList())}
      >
        Delete All
      </Button>
      <SortBy />
    </div>
  );

  const pagination = videosToDisplay.length ? (
    <PaginationComponent
      defaultActivePage={selectedPage}
      totalItems={videosToDisplay.length}
      pageSize={ITEMS_PER_PAGE}
      onSelect={handleSelected}
    />
  ) : null;

  return (
    <>
      {controlButtons}
      {pagination}
      {videoList}
    </>
  );
};

export default VideoList;
