import PropTypes, { number, string } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import CommentForm from './CommentForm';

// eslint-disable-next-line react/prop-types
function CommentCard({ commentObj, getAndSetComments }) {
  const [editToggle, setEditToggle] = useState(false);
  const handleToggle = () => {
    if (editToggle === false) {
      setEditToggle(true);
    } else {
      setEditToggle(false);
    }
  };

  return (
    <Card.Body className="commentCard">
      <Card.Body>
        { editToggle ? <CommentForm handleToggle={handleToggle} commentObj={commentObj} getAndSetComments={getAndSetComments} />
          : <Card.Text>{ commentObj.content }</Card.Text>}
      </Card.Body>
      <div>
        <Button variant="primary" onClick={handleToggle}>
          Edit
        </Button>
      </div>
    </Card.Body>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: number,
    author_id: number,
    post_id: number,
    content: string,
  }).isRequired,
};

export default CommentCard;
