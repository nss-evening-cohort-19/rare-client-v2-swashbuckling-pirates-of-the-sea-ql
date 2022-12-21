import { clientCredentials } from '../client';

const getTagsByPost = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posttags?post_id=${postId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deletePostTag = (postTagId) => ((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posttags/${postTagId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const createPostTag = (postTag) => new Promise((resolve, reject) => {
  const postTagObj = {
    post_id: postTag.postId,
    tag_id: postTag.tagId,
  };
  fetch(`${clientCredentials.databaseURL}/posttags`, {
    method: 'POST',
    body: JSON.stringify(postTagObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export { getTagsByPost, deletePostTag, createPostTag };
