import PropTypes, { number, string } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import CommentForm from './CommentForm';
import { useAuth } from '../../utils/context/authContext';
import { deleteComment } from '../../utils/data/commentData';

// eslint-disable-next-line react/prop-types
function CommentCard({ commentObj, getAndSetComments }) {
  const { user } = useAuth();
  console.warn(commentObj.author.id, user.id);
  const [editToggle, setEditToggle] = useState(false);
  const handleToggle = () => {
    if (editToggle === false) {
      setEditToggle(true);
    } else {
      setEditToggle(false);
    }
  };

  const deleteThisComment = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(commentObj.id).then(() => getAndSetComments());
    }
  };

  return (
    <Card.Body className="commentCard">
      <Card.Body>
        { editToggle ? <CommentForm handleToggle={handleToggle} commentObj={commentObj} getAndSetComments={getAndSetComments} />
          : <Card.Text>{ commentObj.content }</Card.Text>}
      </Card.Body>
      <div>
        { commentObj.author.id === user.id
            && (
            <div>
              <Button variant="primary" onClick={handleToggle}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => { deleteThisComment(commentObj.id); }}>
                Delete
              </Button>
            </div>
            )}
      </div>
    </Card.Body>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    author: PropTypes.shape({
      id: number,
    }),
    id: number,
    post_id: number,
    content: string,
  }).isRequired,
};

export default CommentCard;
