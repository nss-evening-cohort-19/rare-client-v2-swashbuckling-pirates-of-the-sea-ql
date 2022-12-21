/* eslint-disable react/require-default-props */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { updateUser } from '../utils/data/userData';

const initialUserState = {
  firstName: '',
  lastName: '',
  bio: '',
  profileImageUrl: '',
  email: '',
  createdOn: '',
  active: '',
};

function RegisterForm({ user, onUpdate }) {
  const [formData, setFormData] = useState(initialUserState);
  const router = useRouter();

  useEffect(() => {
    if (user.id) {
      setFormData(user);
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      updateUser(formData, user.id);
      router.push(`../../users/${user.id}`);
    } else {
      registerUser(user, formData).then(() => onUpdate(user.uid));
    }
  };

  return (
    <>
      <h1>{user.id ? 'Edit User Profile' : 'Create User Profile'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">

          <Form.Control name="firstName" placeholder="Enter your first name" required value={formData.firstName} onChange={handleChange} />

          <Form.Control name="lastName" placeholder="Enter your last name" required value={formData.lastName} onChange={handleChange} />

          <Form.Control name="bio" as="textarea" placeholder="Tell us about yourself" required value={formData.bio} onChange={handleChange} />

          <Form.Control name="profileImageUrl" placeholder="Link to an image of yourself" required value={formData.profileImageUrl} onChange={handleChange} />

          <Form.Control name="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange} />

        </Form.Group>
        <Button variant="primary" type="submit">
          {user.id ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func,
};

export default RegisterForm;
