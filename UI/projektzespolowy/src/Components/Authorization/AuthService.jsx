import api from '../General/api';

export const register = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  if (response.data.token) {
    sessionStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const refresh = async () => {
  const response = await api.post('/refresh');
  if (response.data.token) {
    sessionStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const confirmEmail = async (token, userId) => {
  const response = await api.get(`/confirmEmail?token=${token}&userId=${userId}`);
  return response.data;
};

export const resendConfirmationEmail = async (email) => {
  const response = await api.post('/resendConfirmationEmail', { email });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/forgotPassword', { email });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post('/resetPassword', data);
  return response.data;
};

export const enable2fa = async () => {
  const response = await api.post('/manage/2fa');
  return response.data;
};

export const getUserInfo = async () => {
  const response = await api.get('/manage/info');
  return response.data;
};

export const updateUserInfo = async (data) => {
  const response = await api.post('/manage/info', data);
  return response.data;
};

export const logout = async () => {
  await api.post('/user/logout');
  sessionStorage.removeItem('token');
};
