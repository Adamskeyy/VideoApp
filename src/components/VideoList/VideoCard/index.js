// reactstrap
import { ListGroupItem } from 'reactstrap';
// hooks
import { useDispatch } from 'react-redux';
// redux
import { removeVideo } from '../../../redux/videoAppSlice';

const VideoCard = ({ video }) => {
  const dispatch = useDispatch();

  return (
    <ListGroupItem onClick={() => dispatch(removeVideo(video.id))}>
      {video.id}
    </ListGroupItem>
  );
};

export default VideoCard;
