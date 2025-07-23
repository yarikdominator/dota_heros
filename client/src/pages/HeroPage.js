import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { fetchHero, updateHero, deleteHero } from '../http/heroAPI';
import userStore from '../store/userStore';
import HeroForm from '../components/HeroForm';

const HeroPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const loadHero = () => {
    setLoading(true);
    fetchHero(id)
      .then(setHero)
      .catch(e => setError('Ошибка загрузки героя: ' + (e.response?.data?.message || e.message)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadHero();
    // eslint-disable-next-line
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateHero(id, data);
      setShowForm(false);
      loadHero();
    } catch (e) {
      setError('Ошибка редактирования героя: ' + (e.response?.data?.message || e.message));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Удалить героя?')) return;
    try {
      await deleteHero(id);
      navigate('/');
    } catch (e) {
      setError('Ошибка удаления героя: ' + (e.response?.data?.message || e.message));
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-5">{error}</Alert>;
  if (!hero) return null;

  return (
    <div className="container mt-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={hero.image.startsWith('http') ? hero.image : `http://localhost:3000/${hero.image}`} alt={hero.name} style={{ height: 200, objectFit: 'cover', background: '#222' }} />
            <Card.Body className="p-2" style={{ background: '#000' }}>
              <Card.Title className="text-white text-center mb-0" style={{ fontSize: 22 }}>{hero.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-4" style={{ minHeight: 150 }}>
            <Card.Body>
              <h5>Описание</h5>
              <div>{hero.description}</div>
            </Card.Body>
          </Card>
          <Card style={{ minHeight: 200 }}>
            <Card.Body>
              <h5>Lore (история героя)</h5>
              <div>{hero.lore}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {userStore.isAdmin && (
        <div className="d-flex gap-2 mt-3">
          <Button variant="primary" onClick={() => setShowForm(true)}>Редактировать</Button>
          <Button variant="danger" onClick={handleDelete}>Удалить</Button>
        </div>
      )}
      <HeroForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleUpdate}
        initial={hero}
      />
    </div>
  );
};

export default HeroPage; 