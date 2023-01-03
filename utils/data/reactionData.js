import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getReactions = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reactions`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getReactions;
