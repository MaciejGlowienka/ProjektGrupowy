import api from '../../General/api';

export const save = async (tasks) => {
    const response = await api.post('/resetPassword', tasks);
    return response.data;
  };