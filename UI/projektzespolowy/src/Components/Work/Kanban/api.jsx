import api from '../../General/api';

export const fetchDataByColumn = () => {
  return api.get(`api/task`)
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const fetchDataById = (id) => {
  return api.get(`api/task/${id}`)
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const addData = (data) => {
  return api.post(`api/task`, data)
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const updateData = (id, data) => {
  return api.put(`api/task/${id}`, data)
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const updateStatus = (data) => {
  return api.put(`api/task/EditStatus`, data)
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

export const deleteData = (id) => {
  return api.delete(`api/task/${id}`)
    .then((result) => result.status === 200)
    .catch((error) => console.log(error));
};
