import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import KanbanBoard from './KanbanBoard';
import './kanban.css';

import {updateStatus, fetchDataByColumn} from './api';
import KanbanModal from './KanbanModal';

const Kanban = () => {
  const [columns, setColumns] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

useEffect(() => {
  const getData = () => {
    fetchDataByColumn()
    .then((result) => setColumns(result))
    .catch((error) => console.log(error));
  };
  getData()
}, [])

  useEffect(() => {
    if (columns) {
      const resultList = [];
      
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const obj = columns[key];
          const status = obj.status;
          console.log(obj.items);
          obj.items.forEach(item => {
            const newItem = {
              Id: item.id,
              Status: status
            };
            resultList.push(newItem);
          });
        }
      }

      setTasks(resultList);
    }
  }, [columns]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateStatus(tasks);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Zapisanie nie powiodło się. Spróbuj ponownie.');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleClose = async (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <>
      {columns ? (
        <>
          <KanbanBoard columns={columns} setColumns={setColumns} />
          <KanbanModal show={showModal} setShow={setShowModal} handleClose={handleClose}/>
          <Button onClick={handleSave} variant="primary">Zapisz</Button>
          <Button onClick={handleAdd} variant="primary">Dodaj</Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </>
  );
};

export default Kanban;
