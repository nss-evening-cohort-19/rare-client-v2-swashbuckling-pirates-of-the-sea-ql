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

export { getAllComments, getSingleComment };
