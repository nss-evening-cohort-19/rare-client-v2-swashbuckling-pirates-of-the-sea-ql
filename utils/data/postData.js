// API calls for posts
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSinglePost = (postId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${postId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        userId: data.user_id,
        categoryId: data.category_id,
        title: data.title,
        content: data.content,
        createdOn: data.publication_date,
        imageUrl: data.image_url,
      });
    }).catch((error) => reject(error));
});

const createPost = (post, user) => new Promise((resolve, reject) => {
  const postObj = {
    user_id: user.uid,
    category_id: post.categoryId,
    title: post.title,
    content: post.content,
    publication_date: Date.now(),
    image_url: post.imageUrl,
  };
  fetch(`${dbUrl}/posts`, {
    method: 'POST',
    body: JSON.stringify(postObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((err) => reject(err));
});

const deletePost = (postId) => ((resolve, reject) => {
  fetch(`${dbUrl}/posts/${postId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updatePost = (user, postId, post) => ((resolve, reject) => {
  const postObj = {
    user_id: user.uid,
    category_id: post.categoryId,
    title: post.title,
    content: post.content,
    publication_date: post.createdOn,
    image_url: post.imageUrl,
  };
  fetch(`${dbUrl}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(postObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

export {
  getPosts, getSinglePost, createPost, deletePost, updatePost,
};
