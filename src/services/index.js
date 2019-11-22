import axios from 'axios';
const BASE_URL = 'http://9022c60a.ngrok.io';

export const post = async ({ url, body, headers }) => {
  console.log('INSIDE SERVICE BODY', body, typeof body);
  try {
    const res = await axios.post(`${BASE_URL}${url}`, body, { headers });
    localStorage.setItem('accessToken', res.data.data.accessToken);
    localStorage.setItem('refreshToken', res.data.data.refreshToken);
    console.log(res);
  } catch (error) {
    console.log(error);
    throw new Error('User not found!');
  }
};

export const GetUsersPost = async ({ url, body, headers }) => {
  console.log('INSIDE SERVICE BODY', body, typeof body);
  try {
    const res = await axios.post(`${BASE_URL}${url}`, body, { headers });
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const blockOrDelete = async ({ url, headers = {} }) => {
  try {
    const res = await axios.delete(`${BASE_URL}${url}`, { headers });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const get = async ({ url, headers }) => {
  try {
    const res = await axios.get(`${BASE_URL}${url}`, { headers: headers });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
