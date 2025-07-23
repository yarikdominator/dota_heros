import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore';
import { loginUser } from '../http/userAPI';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(login, password);
      const user = jwt_decode(data.token);
      userStore.setUser(user);
      if (user.role === 'ADMIN') {
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (e) {
      setError('Ошибка входа: ' + (e.response?.data?.message || e.message));
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h2 className="mb-4">Вход</h2>
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
          <Button type="submit" variant="primary" className="w-100">Войти</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login; 