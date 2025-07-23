import axios from 'axios';

const $host = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const $authHost = axios.create({
  baseURL: 'http://localhost:3000/api',
});

$authHost.interceptors.request.use(config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export { $host, $authHost }; 