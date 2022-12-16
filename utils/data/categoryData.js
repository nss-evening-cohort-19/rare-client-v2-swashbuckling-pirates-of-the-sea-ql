// API calls for categories
/* eslint-disable import/prefer-default-export */
export const getCategories = () => fetch('http://localhost:8088/categories')
  .then((res) => res.json());

// export const getCategoriesBySearchTerm = (searchTerm) => fetch(`http://localhost:8088/categories?search=${searchTerm}`)
//   .then((res) => res.json());

export const getCategoriedById = (id) => fetch(`http://localhost:8088/categories/${id}`)
  .then((res) => res.json());

export const addCategory = (category) => fetch('http://localhost:8088/categories', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(category),
});

export const updateCategory = (category) => fetch(`http://localhost:8088/categories/${category.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(category),
});

export const deleteCategory = (categoryId) => fetch(`http://localhost:8088/categories/${categoryId}`, {
  method: 'DELETE',
});
