import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import HeroCard from '../components/HeroCard';
import HeroForm from '../components/HeroForm';
import { fetchHeroes, createHero, updateHero, deleteHero } from '../http/heroAPI';
import userStore from '../store/userStore';

const Home = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editHero, setEditHero] = useState(null);

  const loadHeroes = () => {
    setLoading(true);
    fetchHeroes()
      .then(data => setHeroes(data.rows || []))
      .catch(e => setError('Ошибка загрузки героев: ' + (e.response?.data?.message || e.message)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadHeroes();
  }, []);

  const handleCreate = async (hero) => {
    try {
      await createHero(hero);
      setShowForm(false);
      loadHeroes();
    } catch (e) {
      setError('Ошибка создания героя: ' + (e.response?.data?.message || e.message));
    }
  };

  const handleEdit = (hero) => {
    setEditHero(hero);
    setShowForm(true);
  };

  const handleUpdate = async (hero) => {
    try {
      await updateHero(editHero.id, hero);
      setEditHero(null);
      setShowForm(false);
      loadHeroes();
    } catch (e) {
      setError('Ошибка редактирования героя: ' + (e.response?.data?.message || e.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить героя?')) return;
    try {
      await deleteHero(id);
      loadHeroes();
    } catch (e) {
      setError('Ошибка удаления героя: ' + (e.response?.data?.message || e.message));
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-5">{error}</Alert>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Герои Dota 2</h1>
        {userStore.isAdmin && <Button onClick={() => { setEditHero(null); setShowForm(true); }}>Добавить героя</Button>}
      </div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {heroes.map(hero => (
          <Col key={hero.id}>
            <HeroCard hero={hero} onEdit={handleEdit} onDelete={handleDelete} />
          </Col>
        ))}
      </Row>
      <HeroForm
        show={showForm}
        onHide={() => { setShowForm(false); setEditHero(null); }}
        onSubmit={editHero ? handleUpdate : handleCreate}
        initial={editHero}
      />
    </>
  );
};

export default Home; 