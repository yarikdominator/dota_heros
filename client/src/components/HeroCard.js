import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userStore from '../store/userStore';

const HeroCard = ({ hero, onEdit, onDelete }) => (
  <Card className="h-100" style={{ minWidth: 220 }}>
    <Link to={`/hero/${hero.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card.Img variant="top" src={hero.image.startsWith('http') ? hero.image : `http://localhost:3000/${hero.image}`} alt={hero.name} style={{ height: 180, objectFit: 'cover', background: '#222' }} />
      <Card.Body className="p-2" style={{ background: '#000' }}>
        <Card.Title className="text-white text-center mb-0" style={{ fontSize: 18 }}>{hero.name}</Card.Title>
      </Card.Body>
    </Link>
    {userStore.isAdmin && (
      <div className="d-flex justify-content-between p-2">
        <Button variant="outline-primary" size="sm" onClick={() => onEdit(hero)}>Редактировать</Button>
        <Button variant="outline-danger" size="sm" onClick={() => onDelete(hero.id)}>Удалить</Button>
      </div>
    )}
  </Card>
);

export default HeroCard; 