// reactstrap
import { ListGroupItem, Button } from 'reactstrap';
// hooks
import { useDispatch } from 'react-redux';
// redux
import { removeVideo } from '../../../redux/videoAppSlice';
// components
import VideoModal from './VideoModal';

const VideoCard = ({ video }) => {
  const dispatch = useDispatch();

  // onClick na img otwarcie modalu i możliwość odtworzenia filmu
  return (
    <ListGroupItem>
      <img
        style={{ cursor: 'pointer' }}
        onClick={() => console.log('modal')}
        src={video.thumbnail}
        alt={video.title}
      />
      <VideoModal />
      <h5>{video.title}</h5>
      <p>Views: {video.views}</p>
      <p>Likes: {video.likes}</p>
      <p>Added: {video.addedAt}</p>
      <Button color="warning">Add to favourites</Button>
      <Button color="danger" onClick={() => dispatch(removeVideo(video.id))}>
        Delete
      </Button>
    </ListGroupItem>
  );
};

export default VideoCard;
