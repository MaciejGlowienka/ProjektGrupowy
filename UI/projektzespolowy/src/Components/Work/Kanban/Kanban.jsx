import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import KanbanBoard from './KanbanBoard';
import './kanban.css';
import { updateStatus, fetchDataByColumn, deleteData } from './api';
import KanbanModal from './KanbanModal';

const Kanban = () => {
  const [columns, setColumns] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchDataByColumn();
        setColumns(result);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (columns) {
      const resultList = [];
      for (const key in columns) {
        if (columns.hasOwnProperty(key)) {
          const obj = columns[key];
          const status = obj.status;
          obj.items.forEach((item) => {
            const newItem = {
              Id: item.id,
              Status: status,
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

  const handleRemoveTask = async (id) => {
    try {
      const success = await deleteData(id);
      if (success) {
        setColumns((prevColumns) => {
          const updatedColumns = { ...prevColumns };
          for (const column in updatedColumns) {
            if (updatedColumns[column].items) {
              updatedColumns[column].items = updatedColumns[column].items.filter((task) => task.id !== id);
            }
          }
          return updatedColumns;
        });
        console.log(`Task ${id} removed successfully.`);
      } else {
        setErrorMessage(`Failed to remove task ${id}`);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || `Error removing task ${id}`);
    }
  };


  return (
      <>
        {columns ? (
            <>
              <KanbanBoard
                  columns={columns}
                  setColumns={setColumns}
                  onRemoveTask={handleRemoveTask}
              />
              <KanbanModal show={showModal} setShow={setShowModal} handleClose={handleClose} />
              <div className="save-add-btn">
                <Button onClick={handleSave} variant="primary">
                  Zapisz
                </Button>
                <Button onClick={handleAdd} variant="primary">
                  Dodaj
                </Button>
              </div>
            </>
        ) : (
            <p>Loading...</p>
        )}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </>
  );
};

export default Kanban;
