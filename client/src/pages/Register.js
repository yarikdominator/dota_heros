import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore';
import { registration } from '../http/userAPI';
import jwt_decode from 'jwt-decode';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registration(login, password);
      const user = jwt_decode(data.token);
      userStore.setUser(user);
      navigate('/');
    } catch (e) {
      setError('Ошибка регистрации: ' + (e.response?.data?.message || e.message));
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h2 className="mb-4">Регистрация</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Логин</Form.Label>
            <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" variant="success" className="w-100">Зарегистрироваться</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Register; 