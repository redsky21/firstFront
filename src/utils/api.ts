import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://localhost:8080',
  // baseURL: 'http://ec2-13-125-255-143.ap-northeast-2.compute.amazonaws.com:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  //   withCredentials: true,
});

export default API;
