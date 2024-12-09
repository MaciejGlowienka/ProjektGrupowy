import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authorization/AuthContext';
import { login as loginService } from '../Authorization/AuthService'; // Importowanie funkcji logowania
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginModal = ({ show, handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginService({ email, password });
            if (response.accessToken) {
                sessionStorage.setItem('token', response.accessToken);
                login();
                handleClose();
                navigate('/kanban');
            } else {
                throw new Error('No accessToken returned from API');
            }
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || 'Login failed. Please try again.'
            );
        }
    };


    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Zaloguj się</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Wprowadź email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Wprowadź hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <Button variant="primary" type="submit" className="w-100">
                        Zaloguj
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;

