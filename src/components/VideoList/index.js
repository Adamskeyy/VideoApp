// reactstrap / styles
import { ListGroup, Button } from 'reactstrap';
import PaginationComponent from 'react-reactstrap-pagination';
import './VideoList.css';
// hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// redux
import { fetchVideos, clearVideoList } from '../../redux/videoAppSlice';
// components
import VideoCard from '../VideoCard';
import SortBy from '../SortBy';
// variables
const ITEMS_PER_PAGE = 3;

const VideoList = () => {
  // video state
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videoApp.videos);
  // UI state
  const [isCardLayout, setIsCardLayout] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  // pagination
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const from = (selectedPage - 1) * ITEMS_PER_PAGE;
  const to = selectedPage * ITEMS_PER_PAGE;
  const videosToDisplay = videos.filter((v) => !showFavourites || v.favourite);
  const videosOnCurrentPage = videosToDisplay.slice(from, to);

  const handleSelected = (selectedPage) => {
    setSelectedPage(selectedPage);
  };

  const handleFavouriteFilter = () => {
    // wróć na pierwszą stronę
    setShowFavourites((prev) => !prev);
  };

  let favouriteIconClasses = 'fa fa-star';
  if (showFavourites) {
    favouriteIconClasses = 'fa fa-star checked';
  }

  // videos in filter - wszystkie/favourites
  // videos to show in current page - max_per_page

  // wygenerować listę z samymi favourites
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

  return (
    <>
      {controlButtons}
      <PaginationComponent
        totalItems={videosToDisplay.length}
        pageSize={ITEMS_PER_PAGE}
        onSelect={handleSelected}
      />
      {videoList}
    </>
  );
};

export default VideoList;
