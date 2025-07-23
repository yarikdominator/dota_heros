import React from 'react';
import { Card } from 'react-bootstrap';
import userStore from '../store/userStore';

const Profile = () => {
  const { user } = userStore;
  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h2>Профиль</h2>
        <p><b>Логин:</b> {user?.login}</p>
        <p><b>Роль:</b> {user?.role === 'ADMIN' ? 'Администратор' : 'Пользователь'}</p>
      </Card.Body>
    </Card>
  );
};

export default Profile; 