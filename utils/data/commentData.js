import { clientCredentials } from '../client';

const getAllComments = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${commentId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        postId: data.post_id,
        authorId: data.author_id,
        content: data.content,
        createdOn: data.created_on,
      });
    })
    .catch((error) => reject(error));
});

const createComment = (user, comment) => new Promise((resolve, reject) => {
  const commentObj = {
    post_id: comment.postId,
    author_id: comment.authorId,
    content: comment.content,
    created_on: comment.createdOn,
    user_id: user.uid,
  };
  fetch(`${clientCredentials.databaseURL}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export { getAllComments, getSingleComment, createComment };
