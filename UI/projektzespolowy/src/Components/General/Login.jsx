import React, { useState } from 'react';
import { login } from '../Authorization/AuthService';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      sessionStorage.setItem('token', data.accessToken);
      setErrorMessage('');
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Logowanie nie powiodło się. Spróbuj ponownie.');
    }
  };

  return (
  <Form onSubmit={handleLogin}>
    <h1>Zaloguj się:</h1>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        Email
      </Form.Label>
      <Col sm="10">
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Wprowadź email"
        />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
      <Form.Label column sm="2">
        Hasło
      </Form.Label>
      <Col sm="10">
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Wprowadź hasło"
        />
      </Col>
    </Form.Group>

    <Button type="submit">Zaloguj</Button>

    {errorMessage && <p className="text-danger">{errorMessage}</p>}
  </Form>
  );
};

export default Login;
