/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addTag, getTags } from '../../utils/data/tagData';

const initialState = {
  label: '',
};

// eslint-disable-next-line react/prop-types
function TagForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setTag] = useState([]);

  useEffect(() => {
    getTags().then(setTag);
    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    addTag(payload).then(() => {
      setFormInput(initialState);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Create a new category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Add text"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
}

TagForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

TagForm.defaultProps = {
  obj: initialState,
};

export default TagForm;
