/* eslint-disable import/prefer-default-export */
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSingleUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${userId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        uid: data.uid,
        firstName: data.first_name,
        lastName: data.last_name,
        bio: data.bio,
        profileImageUrl: data.profile_image_url,
        email: data.email,
        createdOn: data.created_on,
        active: data.active,
      });
    }).catch((error) => reject(error));
});

const updateUser = (userObj, userId) => ((resolve, reject) => {
  const newUserObj = {
    first_name: userObj.firstName,
    last_name: userObj.lastName,
    bio: userObj.bio,
    profile_image_url: userObj.profileImageUrl,
    email: userObj.email,
    active: true,
  };
  fetch(`${dbUrl}/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(newUserObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(resolve)
    .catch(reject);
});

const deleteUser = (userId) => ((resolve, reject) => {
  fetch(`${dbUrl}/users/${userId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export { getSingleUser, updateUser, deleteUser };
