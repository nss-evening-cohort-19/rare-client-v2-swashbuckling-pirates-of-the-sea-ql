import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function PostSearch({ posts, setFilteredPosts }) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = posts.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()) || post.content.toLowerCase().includes(value.toLowerCase()));
    setFilteredPosts(results);
  };

  return (
    <Form className="postSearch">
      <Form.Control type="search" placeholder="Search Posts" value={searchInput} onChange={handleChange} />
    </Form>
  );
}

PostSearch.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
    }),
  ).isRequired,
  setFilteredPosts: PropTypes.func.isRequired,
};

export default PostSearch;
