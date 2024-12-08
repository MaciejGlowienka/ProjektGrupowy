import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { addData } from './api';
import { useNavigate } from 'react-router-dom';

const KanbanModal = ({ show, setShow }) => {
  const [editTitle, setEditTitle] = useState('');
  const [editSummary, setEditSummary] = useState('');
  const [editStatus, setEditStatus] = useState(0);
  const [editDueDate, setEditDueDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const task = {
      Title: editTitle,
      Summary: editSummary,
      Status: editStatus,
      DueDate: editDueDate,
    };

    try {
      await addData(task);
      setShow(false);
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to save the task. Please try again.');
    }
  };

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <label>Title</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Summary</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Summary"
                    value={editSummary}
                    onChange={(e) => setEditSummary(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Status</label>
                <select
                    className="form-control"
                    value={editStatus}
                    onChange={(e) => setEditStatus(parseInt(e.target.value, 10))}
                >
                  <option value={0}>To Do</option>
                  <option value={1}>In Progress</option>
                  <option value={2}>Done</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Due Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={editDueDate ? editDueDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => setEditDueDate(new Date(e.target.value))}
                />
              </Col>
            </Row>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
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
