import React, {
  useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { addTag, updateTag } from '../../utils/data/tagData';

const initialState = {
  label: '',
  id: '',
};

function TagForm({ obj }) {
  const [tagFormInput, setTagFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.id) setTagFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTagFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateTag(tagFormInput)
        .then(() => router.push('/tags'));
    } else {
      const payload = { ...tagFormInput };
      addTag(payload).then(() => {
        router.push('/tags');
      });
    }
  };

  return (
    <Form className="form-floating" onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{obj.id ? 'Update' : 'Create'} Tag</h2>
      <FloatingLabel controlId="floatingInput1" label="Label" className="mb-3">
        <Form.Control type="text" placeholder="Label" name="label" value={tagFormInput.label} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Tag</Button>
    </Form>
  );
}

TagForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
};

// DEFAULT PROPS
TagForm.defaultProps = {
  obj: initialState,
};

export default TagForm;
