import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createComment, updateComment } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  content: '',
};

// eslint-disable-next-line react/prop-types
function CommentForm({ postId, commentObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [comment, setComment] = useState();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (commentObj.id) {
      setComment(commentObj);
      setFormInput(commentObj);
    } else {
      setComment({});
      setFormInput(initialState);
    }
  }, [commentObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.id) {
      updateComment(formInput)
        .then(() => {
          setComment({});
          setFormInput(initialState);
          router.push(`/posts/${postId}`);
        });
    } else {
      console.log(formInput);
      const payload = {
        ...formInput, postId,
      };
      console.log(payload);
      createComment(user, payload).then(() => {
        setFormInput(initialState);
        router.push(`/posts/${postId}`);
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <FloatingLabel controlId="floatingInput3" label="Add a comment.." className="mb-3 commentForm">
          <Form.Control
            type="text"
            placeholder="Add a comment..."
            name="content"
            value={formInput.content}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button className="commentSubmitButton" type="submit">{comment?.id ? 'Update' : ''} Comment</Button>
      </Form>
    </>

  );
}

CommentForm.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    postId: PropTypes.number,
  }),
};

CommentForm.defaultProps = {
  commentObj: initialState,
};

export default CommentForm;
