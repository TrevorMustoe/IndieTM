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

const updateTour = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tours/${payload.firebaseKey}.json`, { // Specify the tour path
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTour = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tours.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteTour = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tours/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getTours, getSingleTour, updateTour, createTour, deleteTour,
};
