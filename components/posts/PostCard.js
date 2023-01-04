import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deletePost } from '../../utils/data/postData';
import { getTagsByPost } from '../../utils/data/postTagData';

export default function PostCard({
  createdOn, title, content, imageUrl, categoryId, userId, onUpdate, id,
}) {
  const [postTagsArray, setPostsTagsArray] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const deleteThisPost = () => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      deletePost(id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getTagsByPost(id).then(setPostsTagsArray);
  }, [id]);
  return (
    <Card>
      <Link passHref href={`users/${userId.id}`}>
        <Card.Header>
          Posted on {createdOn} by {userId?.first_name} {userId?.last_name}
        </Card.Header>
      </Link>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div className="row">
          <div className="col-6">
            <Card.Img src={imageUrl} />
          </div>
          <div className="col-6">
            <Card.Text>{content}</Card.Text>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="cardFooter">
        <b>{categoryId?.label}</b>
        {postTagsArray.length > 0
          ? postTagsArray.map((postTag) => (
            <span key={postTag.id} className="badge text-bg-dark">
              {postTag.tag_label}
            </span>
          ))
          : ''}
        <Button variant="link" startIcon={<PageviewIcon />} onClick={() => router.push(`../../posts/${id}`)}>
          VIEW
        </Button>
        {userId.id === user.id ? (
          <>
            <Button variant="link" startIcon={<EditIcon />} onClick={() => router.push(`../../posts/edit/${id}`)}>
              EDIT
            </Button>
            <Button variant="link" startIcon={<DeleteIcon />} onClick={() => deleteThisPost(id)}>
              DELETE
            </Button>
          </>
        ) : (
          ''
        )}
      </Card.Footer>
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
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
