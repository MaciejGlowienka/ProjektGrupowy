import React, {useState} from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';

import {addData} from './api';

import { useNavigate } from 'react-router-dom';
const KanbanModal = ({
  show,
  setShow,
  handleClose
}) => {
  const [editTitle, setEditTitle] = useState([]);
  const [editSummary, setEditSummary] = useState([]);
  const [editStatus, setEditStatus] = useState([]);
  const [editOwnerId, setEditOwnerId] = useState([]);
  const [editOrderId, setEditOrderId] = useState([]);
  const [editDueDate, setEditDueDate] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "Title",
      value: editTitle,
      setState: setEditTitle,
    },
    {
      id: 2,
      name: "Summary",
      value: editSummary,
      setState: setEditSummary,
    },
    {
      id: 3,
      name: "Status",
      value: editStatus,
      setState: setEditStatus,
    },
    {
      id: 4,
      name: "DueDate",
      value: editDueDate,
      setState: setEditDueDate,
    },
    {
      id: 5,
      name: "OwnerId",
      value: editOwnerId,
      setState: setEditOwnerId,
    },
    {
      id: 6,
      name: "OrderId",
      value: editOrderId,
      setState: setEditOrderId,
    }
  ]

  const handleUpdate = async (e) => {
    e.preventDefault();

    const task = {
      Title: editTitle,
      Summary: editSummary,
      Status: editStatus,
      DueDate: editDueDate,
      OwnerId: editOrderId,
      OrderId: editOwnerId
    };

    try {
      await addData(task);
      setShow(false);
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Zapisanie nie powiodło się. Spróbuj ponownie.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Modify Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {
            inputs.map((input) => (
              <Col>
                <label>{input.name}</label>
                <input
                  key={input.id}
                  type="text"
                  className="form-control"
                  placeholder={input.name}
                  value={input.value}
                  onChange={(e) => input.setState(e.target.value)}
                />
              </Col>
            ))
          }
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KanbanModal;
