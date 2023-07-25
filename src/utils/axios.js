import axios from 'axios';

const instanse = axios.create({
  baseURL: 'https://rapid-back.vercel.app/api',
  // baseURL: 'http://localhost:5000/api',
  // baseURL: 'http://192.168.0.101:5000/api',
});

instanse.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instanse;
