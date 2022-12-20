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

const createPost = (postObj, user) => new Promise((resolve, reject) => {
  const post = {
    category_id: Number(postObj.categoryId),
    title: postObj.title,
    content: postObj.content,
    publication_date: new Date().toISOString().split('T')[0],
    image_url: postObj.imageUrl,
    user_id: user.id,
  };
  fetch(`${dbUrl}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deletePost = (postId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${postId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const updatePost = (user, post, postId) => new Promise((resolve, reject) => {
  const postObj = {
    category_id: Number(post.categoryId),
    title: post.title,
    content: post.content,
    publication_date: post.createdOn,
    image_url: post.imageUrl,
    user_id: user.uid,
  };
  fetch(`${dbUrl}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(postObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getPosts, getSinglePost, createPost, deletePost, updatePost,
};
