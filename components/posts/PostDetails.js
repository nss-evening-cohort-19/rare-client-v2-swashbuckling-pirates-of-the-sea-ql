import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deletePost } from '../../utils/data/postData';

function PostDetails({ postObj }) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Card>
      <Link passHref href={`../users/${postObj?.userId?.id}`}>
        <Card.Header>
          Posted on: {postObj.createdOn} by: {postObj.userId?.first_name} {postObj.userId?.last_name}
        </Card.Header>
      </Link>
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        <Card.Img src={postObj.imageUrl} />
        <Card.Text>{postObj.content}</Card.Text>
      </Card.Body>
      <Card.Footer>{postObj.categoryId?.label}</Card.Footer>
      {postObj.userId?.id === user.id ? (
        <>
          <Button onClick={(() => router.push(`../posts/edit/${postObj.id}`))}>Edit</Button>
          <Button onClick={(() => deletePost(postObj.id).then(() => router.push('/')))}>DELETE</Button>
        </>
      ) : ''}
    </Card>
  );
}

PostDetails.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    createdOn: PropTypes.string,
    imageUrl: PropTypes.string,
    categoryId: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    userId: PropTypes.shape({
      uid: PropTypes.string,
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }).isRequired,
};

export default PostDetails;
