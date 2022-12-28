import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createPost, updatePost, getSinglePost } from '../../utils/data/postData';
import { getCategories } from '../../utils/data/categoryData';
import { getTags } from '../../utils/data/tagData';
import { createPostTag, deletePostTag, getTagsByPost } from '../../utils/data/postTagData';

const initialState = {
  title: '',
  content: '',
  imageUrl: '',
  categoryId: null,
};
export default function PostForm({ postObj, user }) {
  const [currentPost, setCurrentPost] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategories);
    getTags().then(setTags);
    if (postObj.id) {
      getSinglePost(postObj.id).then((response) => {
        getTagsByPost(postObj.id).then((tagArr) => setSelectedTags(tagArr.map((tag) => tag.tag_id)));
        setCurrentPost(response);
        setSelectedCategory(postObj.categoryId.id);
      });
    }
  }, [postObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoryId') {
      setSelectedCategory(value);
      setCurrentPost((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setCurrentPost((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleTagChange = (tagId) => {
    if (selectedTags.includes(tagId)) {
      console.warn(selectedTags);
      setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj.id) {
      getTagsByPost(postObj.id).then((existingPostTags) => {
        existingPostTags.forEach((existingPostTag) => {
          if (!selectedTags.includes(existingPostTag.tag_id)) {
            deletePostTag(existingPostTag.id);
          }
        });
        selectedTags.forEach((tagId) => {
          const existingPostTag = existingPostTags.find((postTag) => postTag.tag_id === tagId);
          if (!existingPostTag) {
            const postTag = {
              postId: postObj.id,
              tagId,
            };
            createPostTag(postTag);
          }
        });
      });
      updatePost(user, currentPost, postObj.id).then(() => {
        router.push('/');
      });
    } else {
      createPost(currentPost, user).then((response) => {
        selectedTags.forEach((tagId) => {
          const postTag = {
            postId: response.id,
            tagId,
          };
          createPostTag(postTag);
        });
        router.push('/');
      });
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
          <Form.Select onChange={handleChange} className="mb-3" name="categoryId" value={selectedCategory} required>
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          {tags.map((tag) => (
            <Form.Check type="checkbox" label={tag.label} value={tag.id} key={tag.id} checked={selectedTags.includes(tag.id)} onChange={() => handleTagChange(tag.id)} id={`checkbox-${tag.id}`} />
          ))}
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
    tagId: PropTypes.shape({
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
