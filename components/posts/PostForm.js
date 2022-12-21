import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createPost, updatePost } from '../../utils/data/postData';
import { getCategories } from '../../utils/data/categoryData';

const initialState = {
  title: '',
  content: '',
  imageUrl: '',
  categoryId: null,
};
export default function PostForm({ postObj, user }) {
  const [currentPost, setCurrentPost] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategories);
    if (postObj.id) {
      setCurrentPost(postObj);
    }
  }, [postObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj.id) {
      updatePost(user, currentPost, postObj.id).then(() => router.push('/'));
    } else {
      createPost(currentPost, user).then(() => router.push('/'));
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentPost.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <textarea className="form-control" rows="5" name="content" required value={currentPost.content} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image Url</Form.Label>
          <Form.Control name="imageUrl" required value={currentPost.imageUrl} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select onChange={handleChange} className="mb-3" name="categoryId" defaultValue={currentPost.categoryId} required>
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

PostForm.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    imageUrl: PropTypes.string,
    createdOn: PropTypes.string,
    categoryId: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

PostForm.defaultProps = {
  postObj: initialState,
};
