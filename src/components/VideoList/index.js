// reactstrap / styles
import {
  ListGroup,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import './VideoList.css';
// hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import usePagination from '../../hooks/usePagination';
// redux
import { fetchVideos, clearVideoList } from '../../redux/videoAppSlice';
// components
import VideoCard from '../VideoCard';
import SortBy from '../SortBy';
// variables
const ITEMS_PER_PAGE = 3;
const START_FROM = 1;

const VideoList = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videoApp.videos);
  const [isCardLayout, setIsCardLayout] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  let videosToDisplay = [...videos];
  if (showFavourites) {
    videosToDisplay = videosToDisplay.filter((video) => video.favourite);
  }

  let favouriteIconClasses = 'fa fa-star';
  if (showFavourites) {
    favouriteIconClasses = 'fa fa-star checked';
  }

  const {
    slicedData,
    pagination,
    goToPrevPage,
    goToNextPage,
    changePage,
  } = usePagination({
    itemsPerPage: ITEMS_PER_PAGE,
    data: videosToDisplay,
    startFrom: START_FROM,
  });

  const videoList = videosToDisplay.length ? (
    <ListGroup horizontal={isCardLayout}>
      {videosToDisplay.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </ListGroup>
  ) : (
    <p>There is nothing to display!</p>
  );

  // component?
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
      <Button
        className="m-2"
        onClick={() => setShowFavourites((prev) => !prev)}
        color="secondary"
      >
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

  // component?
  const paginationNav =
    videosToDisplay.length < ITEMS_PER_PAGE ? null : (
      <Pagination aria-label="Page navigation">
        <PaginationItem>
          <PaginationLink
            disabled={false}
            previous
            href="#"
            onClick={goToPrevPage}
          />
        </PaginationItem>
        {pagination.map((page) => {
          if (!page.ellipsis) {
            return (
              <PaginationItem active={page.current} key={page.id}>
                <PaginationLink
                  href="/#"
                  onClick={(e) => changePage(page.id, e)}
                >
                  {page.id}
                </PaginationLink>
              </PaginationItem>
            );
          } else {
            return (
              <PaginationItem key={page.id}>
                <span>&hellip;</span>
              </PaginationItem>
            );
          }
        })}
        <PaginationItem>
          <PaginationLink
            disabled={false}
            next
            href="#"
            onClick={goToNextPage}
          />
        </PaginationItem>
      </Pagination>
    );

  return (
    <>
      {controlButtons}
      {videoList}
      {paginationNav}
    </>
  );
};

export default VideoList;
