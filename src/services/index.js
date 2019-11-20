import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL;
export const post = async ({ url, body, headers }) => {
  console.log('INSIDE SERVICE BODY', body, typeof body);
  try {
    const res = await axios.post(`${BASE_URL}${url}`, body);
    const { accessToken, refreshToken } = res.data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.log(error);
    throw new Error('User not found!');
  }
};
