// API calls for tags
export const getTags = () => fetch('http://localhost:8088/tags')
  .then((res) => res.json());

export const getTagsById = (id) => fetch(`http://localhost:8088/tags/${id}`)
  .then((res) => res.json());

export const addTag = (tag) => fetch('http://localhost:8088/tags', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(tag),
});

export const updateTag = (tag) => fetch(`http://localhost:8088/tags/${tag.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(tag),
});

export const deleteTag = (tagId) => fetch(`http://localhost:8088/tags/${tagId}`, {
  method: 'DELETE',
});
