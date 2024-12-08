import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchDataById, updateData } from './api';

const TaskEditModal = ({ show, handleClose, taskId, onTaskUpdated }) => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        if (taskId) {
            fetchDataById(taskId)
                .then((data) => {
                    setTitle(data.title);
                    setSummary(data.summary);
                    setStatus(data.status);
                    setDueDate(data.dueDate ? data.dueDate.split('T')[0] : '');
                    console.log(data);
                })
                .catch((error) => setErrorMessage('Failed to load task details.'));
        }
    }, [taskId]);

    const handleSave = async () => {
        try {
            const updatedTask = {
                id: taskId,
                title,
                summary,
                status,
                dueDate,
            };
            await updateData(taskId, updatedTask);
            onTaskUpdated(updatedTask);
            handleClose();
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to save changes. Please try again.');
        }
    };


    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskEditModal;
