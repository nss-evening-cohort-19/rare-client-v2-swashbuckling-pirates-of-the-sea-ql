import PropTypes, { number, string } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import CommentForm from './CommentForm';
import { useAuth } from '../../utils/context/authContext';
import { deleteComment } from '../../utils/data/commentData';

// eslint-disable-next-line react/prop-types
function CommentCard({ commentObj, getAndSetComments }) {
  const { user } = useAuth();
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
    <Card>
      <Card.Body className="commentCard">
        <Card.Body>
          <Card.Title>{commentObj.post.title}</Card.Title>
          { editToggle ? <CommentForm handleToggle={handleToggle} commentObj={commentObj} getAndSetComments={getAndSetComments} />
            : <Card.Text>{ commentObj.content }</Card.Text>}
          <Card.Text>Posted By: { commentObj.author.first_name } { commentObj.author.last_name }</Card.Text>
          <Card.Text>Posted On: { commentObj.created_on }</Card.Text>
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
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    author: PropTypes.shape({
      id: number,
      first_name: string,
      last_name: string,
    }),
    post: PropTypes.shape({
      title: string,
    }),
    id: number,
    post_id: number,
    content: string,
    created_on: string,
  }).isRequired,
};

export default CommentCard;
