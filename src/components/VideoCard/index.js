// reactstrap
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import './VideoCard.css';
// redux
import { useDispatch } from 'react-redux';
import { removeVideo, toggleFavourite } from '../../redux/videoAppSlice';
// components
import VideoModal from '../VideoModal';

const VideoCard = ({ video }) => {
  const dispatch = useDispatch();
  const {
    id,
    title,
    views,
    likes,
    addedAt,
    thumbnail,
    favourite,
    origin,
    iframe,
  } = video;

  const handleToggleFavourite = () => {
    const toggledFavourite = {
      ...video,
      favourite: !favourite,
    };
    dispatch(toggleFavourite(toggledFavourite));
  };

  const taskItemClasses = video.favourite
    ? 'fa fa-star ml-2 mr-2 checked'
    : 'fa fa-star ml-2 mr-2';

  const thumbnailRedirect =
    origin === 'youtube'
      ? `https://www.youtube.com/watch?v=${id}`
      : `https://vimeo.com/${id}`;

  return (
    <li className="listItem">
      <Card className="videoCard">
        <CardImg
          top
          width="100%"
          src={thumbnail}
          alt={title}
          style={{ cursor: 'pointer' }}
          onClick={() => window.open(thumbnailRedirect, '_blank')}
        />
        <CardBody className="cardContent">
          <div className="cardData">
            <CardTitle tag="h5">{title}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {origin === 'youtube' ? <p>Views: {views}</p> : null}
            </CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              <p>Likes: {likes}</p>
            </CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              <p>Added: {addedAt}</p>
            </CardSubtitle>
          </div>
          <div className="cardButtons">
            <VideoModal
              videoId={id}
              origin={origin}
              iframe={iframe}
              title={title}
            />
            <Button onClick={handleToggleFavourite} color="secondary">
              <span className={taskItemClasses}></span>
            </Button>
            <Button
              className="m-2"
              color="danger"
              onClick={() => dispatch(removeVideo(id))}
            >
              Delete
            </Button>
          </div>
        </CardBody>
      </Card>
    </li>
  );
};

export default VideoCard;
