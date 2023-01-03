import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const createPostReaction = (postReactionObject, user) => new Promise((resolve, reject) => {
  const postReactionObj = {
    user_id: user.id,
    reaction_id: postReactionObject.reactionId,
    post_id: postReactionObject.postId,
  };
  fetch(`${dbUrl}/postreactions`, {
    method: 'POST',
    body: JSON.stringify(postReactionObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const deletePostReaction = (postReactionId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/postreactions/${postReactionId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export { createPostReaction, deletePostReaction };
