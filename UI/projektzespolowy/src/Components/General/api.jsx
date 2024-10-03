import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7289',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;