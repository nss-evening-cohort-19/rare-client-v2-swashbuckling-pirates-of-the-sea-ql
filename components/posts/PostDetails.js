import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deletePost } from '../../utils/data/postData';
import { getTagsByPost } from '../../utils/data/postTagData';

function PostDetails({ postObj }) {
  const [postTagsArray, setPostsTagsArray] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getTagsByPost(postObj?.id).then(setPostsTagsArray);
  }, [postObj]);

  return (
    <>
      <Card>
        <Link passHref href={`../users/${postObj?.userId?.id}`}>
          <Card.Header>
            Posted on {postObj.createdOn} by {postObj.userId?.first_name} {postObj.userId?.last_name}
          </Card.Header>
        </Link>
        <Card.Body>
          <Card.Title>{postObj.title}</Card.Title>
          <div className="row">
            <div className="col-6">
              <Card.Img src={postObj.imageUrl} />
            </div>
            <div className="col-6">
              <Card.Text>{postObj.content}</Card.Text>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <b>{postObj.categoryId?.label}</b>
          {postTagsArray.length > 0
            ? postTagsArray.map((postTag) => (
              <span key={postTag.id} className="badge text-bg-dark">
                {postTag.tag_label}
              </span>
            ))
            : ''}
          {postObj.userId?.id === user.id ? (
            <>
              <Button variant="link" startIcon={<EditIcon />} onClick={() => router.push(`../posts/edit/${postObj.id}`)}>
                EDIT
              </Button>
              <Button variant="link" startIcon={<DeleteIcon />} onClick={() => deletePost(postObj.id).then(() => router.push('/'))}>
                DELETE
              </Button>
            </>
          ) : (
            ''
          )}
        </Card.Footer>
      </Card>
      <hr />
    </>
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
