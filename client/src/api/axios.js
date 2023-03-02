

import axios from 'axios';

const api = (fn, args) =>
  fn
    .apply(axios, args)
    .then((res) => res.data)
    .catch((error) => {
      if (error?.response) {
        console.error('Response error => ', error?.response?.data, 'Status => ', error?.response?.status);
        // alert(JSON.stringify( error?.response?.data.error) )
      } else if (error?.request) { 
        console.error('Request error => ', error?.request);
      } else {
        console.error('Request error => ', error?.message);
      }
      console.error('Request error => ', error?.config);
      return Promise.reject(error?.response?.data);
    });

const _get = (...rest) => api(axios.get, rest);

const _post = (...rest) => api(axios.post, rest);

const _put = (...rest) => api(axios.put, rest);

const _patch = (...rest) => api(axios.patch, rest);

const _delete = (...rest) => api(axios.delete, rest);

export const baseURL = process.env.REACT_APP_API_SRC || 'http://localhost:5000';
const setCustomHeader = (headers) => {
  let custom_headers = { ...headers };

  if (localStorage.getItem('token')) {
    custom_headers = { authorization:'Bearer ' + localStorage.getItem('token'), ...custom_headers };
  }

  return custom_headers;
};

const httpOptions = (headers, responseType = 'json') => ({
  baseURL,
  responseType,
  headers: setCustomHeader(headers),
});

export const get = (url, params = {}, headers = {}, responseType = 'json') =>
  _get(url, { ...httpOptions(headers, responseType), params });

export const post = (url, body = '', headers = {}, responseType = 'json') =>
  _post(url, body, { ...httpOptions(headers, responseType) });

export const put = (url, body = '', headers = {}, responseType = 'json') =>
  _put(url, body, { ...httpOptions(headers, responseType) });

export const patch = (url, body = '', headers = {}, responseType = 'json') =>
  _patch(url, body, { ...httpOptions(headers, responseType) });

export const httpDelete = (url, data = '', headers = {}, responseType = 'json') =>
  _delete(url, { data, ...httpOptions(headers, responseType) });
  