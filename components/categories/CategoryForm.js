/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { addCategory, getCategories, updateCategory } from '../../utils/data/categoryData';

const initialState = {
  label: '',
};

// eslint-disable-next-line react/prop-types
function CategoryForm({ object }) {
  const [formInput, setFormInput] = useState(initialState);
  const [setCategory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategory);
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
      updateCategory(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formInput };
      addCategory(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <Form className="form-floating" onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{object.id ? 'Update' : 'Create'} a Category</h2>
      <FloatingLabel controlId="floatingInput1" label="Label" className="mb-3">
        <Form.Control type="text" placeholder="Label" name="label" value={formInput.label} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{object.id ? 'Update' : 'Create'} Category</Button>
    </Form>
  );
}

CategoryForm.propTypes = {
  object: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  object: initialState,
};

export default CategoryForm;
