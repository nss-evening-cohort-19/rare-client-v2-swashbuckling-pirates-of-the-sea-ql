// API calls for tags
/* eslint-disable import/prefer-default-export */
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

export const getTags = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/tags`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export const addTag = (tag) => new Promise((resolve, reject) => {
  const tagObj = {
    label: tag.label,
  };
  fetch(`${dbUrl}/tags`, {
    method: 'POST',
    body: JSON.stringify(tagObj),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((err) => reject(err));
});

export const updateTag = (tag, tagId) => new Promise((resolve, reject) => {
  const tagObj = {
    label: tag.label,
  };
  fetch(`${dbUrl}/tags/${tagId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tagObj),
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

export const deleteTag = (tagId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/tags/${tagId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});
