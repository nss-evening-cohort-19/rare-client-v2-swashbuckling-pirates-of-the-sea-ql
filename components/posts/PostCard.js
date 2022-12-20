import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deletePost } from '../../utils/data/postData';

export default function PostCard({
  createdOn, title, content, imageUrl, categoryId, userId, onUpdate, id,
}) {
  const { user } = useAuth();
  const router = useRouter();
  const deleteThisPost = () => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      deletePost(id).then(() => onUpdate());
    }
  };
  return (
    <Card>
      <Card.Header>Posted on: {createdOn} by: {userId?.first_name} {userId?.last_name}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Img src={imageUrl} />
        <Card.Text>
          {content}
        </Card.Text>
        <Button onClick={(() => router.push(`../posts/${id}`))}>VIEW</Button>
        {userId.id === user.id ? (
          <><Button>EDIT</Button><Button onClick={(() => deleteThisPost(id))}>DELETE</Button></>
        ) : ''}
      </Card.Body>
      <Card.Footer>{categoryId?.label}</Card.Footer>
    </Card>
  );
}

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  categoryId: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
  userId: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
