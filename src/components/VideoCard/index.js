// reactstrap/styles
import { ListGroupItem, Button } from 'reactstrap';
import './VideoCard.css';
// hooks
import { useDispatch } from 'react-redux';
// redux
import { removeVideo, toggleFavourite } from '../../redux/videoAppSlice';
// components
import VideoModal from '../VideoModal';

const VideoCard = ({ video }) => {
  const dispatch = useDispatch();
  const { id, title, views, likes, addedAt, thumbnail, favourite } = video;
  // origin

  const handleToggleFavourite = () => {
    const toggledFavourite = {
      ...video,
      favourite: !favourite,
    };
    dispatch(toggleFavourite(toggledFavourite));
  };

  let taskItemClasses = 'fa fa-star';
  if (video.favourite) {
    taskItemClasses = 'fa fa-star checked';
  }

  // onClick na img otwarcie modalu i możliwość odtworzenia filmu
  // render videoCard na podstawie origin

  return (
    <ListGroupItem>
      <img
        style={{ cursor: 'pointer' }}
        onClick={() =>
          window.open(`https://www.youtube.com/watch?v=${id}`, '_blank')
        }
        src={thumbnail}
        alt={title}
      />
      <VideoModal videoId={video.id} />
      <h5>{title}</h5>
      <p>Views: {views}</p>
      <p>Likes: {likes}</p>
      <p>Added: {addedAt}</p>
      <Button onClick={handleToggleFavourite} color="secondary">
        <span className={taskItemClasses}></span>
      </Button>
      <Button
        className="ml-3"
        color="danger"
        onClick={() => dispatch(removeVideo(id))}
      >
        Delete
      </Button>
    </ListGroupItem>
  );
};

export default VideoCard;
