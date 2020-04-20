import axios from 'axios';

// App imports
import Auth from '@lib/Auth';


const postData = (url, dataToSubmit) => {
  const data = axios.post(url, dataToSubmit, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => { return resp.data; })
    .catch((err) => {
      if (err.response) {
        switch (err.response.status) {
          default: return ({ errors: true, status: err.response.status, message: err.response.data.message });
        }
      }
    });
  return data;
};


const getData = (url) => {
  const data = axios.get(url, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => { return resp.data; })
    .catch((err) => {
      if (err.response) {
        switch (err.response.status) {
          default: return ({ errors: true, status: err.response.status, message: err.response.data.message });
        }
      }
    });
  return data;
};


const patchData = (url, dataToSubmit) => {
  const data = axios.patch(url, dataToSubmit, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => { return resp.data; })
    .catch((err) => { return err.response; });
  return data;
};


export {
  postData,
  getData,
  patchData,
};
