// reactstrap / styles
import { Button, ButtonGroup } from 'reactstrap';
import PaginationComponent from 'react-reactstrap-pagination';
import './VideoList.css';
// hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// redux
import { fetchVideos } from '../../redux/videoAppSlice';
// selectors
import { videoSortSelector } from '../../redux/selectors';
// components
import VideoCard from '../VideoCard';
import SortBy from '../SortBy';
import DeleteAllModal from '../DeleteAllModal';
// variables
const ITEMS_PER_PAGE = 5;

const VideoList = () => {
  // video state
  const dispatch = useDispatch();
  const videos = useSelector(videoSortSelector);
  // UI state
  const [isListLayout, setIsListLayout] = useState(true);
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

  const favouriteIconClasses = showFavourites
    ? 'fa fa-star checked'
    : 'fa fa-star';

  const videoList = videosToDisplay.length ? (
    <ul className={isListLayout ? 'videoList' : 'videoGrid'}>
      {videosOnCurrentPage.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </ul>
  ) : (
    <p>There is nothing to display!</p>
  );

  const controlButtons = (
    <div className="controlBar">
      <div className="controlButtons">
        <ButtonGroup className="m-2">
          <Button
            active={isListLayout}
            outline
            onClick={() => setIsListLayout(true)}
          >
            <i className="fa fa-bars"></i>
          </Button>
          <Button
            active={!isListLayout}
            outline
            onClick={() => setIsListLayout(false)}
          >
            <i className="fa fa-th-large"></i>
          </Button>
        </ButtonGroup>
        <SortBy />
        <Button
          className="m-2"
          onClick={handleFavouriteFilter}
          color="secondary"
        >
          <span className={favouriteIconClasses}></span>
        </Button>
      </div>
      <DeleteAllModal />
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
      {videoList}
      {pagination}
    </>
  );
};

export default VideoList;
