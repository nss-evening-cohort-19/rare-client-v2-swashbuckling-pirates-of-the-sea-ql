import React, { useState } from 'react';
import Form from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createPost, updatePost } from '../../utils/data/postData';

const initialState = {
  title: '',
  content: '',
  imageUrl: '',
  categoryId: 0,

};
export default function PostForm({ postObj, user }) {
  const [currentPost, setCurrentPost] = useState(initialState);
  const router = useRouter();

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
      updatePost(currentPost, user, postObj.id).then(() => router.push('/'));
    } else {
      createPost(user, currentPost).then(() => router.push('/'));
    }
  };
  return (
    <Form
      onSubmit={handleSubmit}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '90%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField required id="outlined-required" label="Title" name="title" onChange={handleChange} value={currentPost.title} />
      </div>
      <div>
        <TextField required id="outlined-required" label="Content" name="content" onChange={handleChange} value={currentPost.content} />
      </div>
      <div>
        <TextField required id="outlined-required" label="Image URL" name="imageUrl" onChange={handleChange} />
      </div>
      <div>
        <TextField required id="outlined-select" select label="Select Category" name="categoryId">
          Categories will be mapped over here
        </TextField>
      </div>
      <Button variant="outlined" type="submit">SUBMIT</Button>
    </Form>
  );
}

PostForm.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    imageUrl: PropTypes.string,
    categoryId: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};
