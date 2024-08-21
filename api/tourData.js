import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTours = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tours.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleTour = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tours/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getTours, getSingleTour };
