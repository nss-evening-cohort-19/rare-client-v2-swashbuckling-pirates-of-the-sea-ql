/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { addTag, getTags, updateTag } from '../../utils/data/tagData';

const initialState = {
  label: '',
};

// eslint-disable-next-line react/prop-types
function TagForm({ object }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const [setTag] = useState([]);

  useEffect(() => {
    getTags().then(setTag);
    if (object.id) setFormInput(object);
  }, [object]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (object.id) {
      updateTag(formInput, object.id)
        .then(() => router.push('/tags'));
    } else {
      const payload = { ...formInput };
      addTag(payload).then(() => {
        router.push('/tags');
      });
    }
  };
  return (
    <Form className="form-floating" onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{object.id ? 'Update' : 'Create'} a Tag</h2>
      <FloatingLabel controlId="floatingInput1" label="Label" className="mb-3">
        <Form.Control type="text" placeholder="Label" name="label" value={formInput.label} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{object.id ? 'Update' : 'Create'} Tag</Button>
    </Form>
  );
}

TagForm.propTypes = {
  object: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

TagForm.defaultProps = {
  object: initialState,
};

export default TagForm;
