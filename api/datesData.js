import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Api call for getting all data info
const getAllDates = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tourDates.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getDatesByTourId = (tourID) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tourDates.json?orderBy="tourID"&equalTo="${tourID}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// // Api call to get a single date
const getSingleDate = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tourDates/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// // Api call to create a new Date
const createDate = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tourDates.json`, {
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

// // Api call for deleting tour dates
const deleteDates = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tourDates/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// // Api call for updating tour dates
const updateDate = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tourDates/${payload.firebaseKey}.json`, {
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

export {
  getAllDates, deleteDates, getDatesByTourId, updateDate, createDate, getSingleDate,
};
