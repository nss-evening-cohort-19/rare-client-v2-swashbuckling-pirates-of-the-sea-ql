// API calls for categories
/* eslint-disable import/prefer-default-export */
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

export const getCategories = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/categories/${categoryId}`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export const addCategory = (category) => new Promise((resolve, reject) => {
  const catObj = {
    label: category.label,
  };
  fetch(`${dbUrl}/categories`, {
    method: 'POST',
    body: JSON.stringify(catObj),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((err) => reject(err));
});

export const updateCategory = (category, categoryId) => ((resolve, reject) => {
  const catObj = {
    label: category.label,
  };
  fetch(`${dbUrl}/categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(catObj),
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

export const deleteCategory = (categoryId) => ((resolve, reject) => {
  fetch(`${dbUrl}/categories/${categoryId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

// export const getCategoriesBySearchTerm = (searchTerm) => fetch(`http://localhost:8088/categories?search=${searchTerm}`)
//   .then((res) => res.json());
