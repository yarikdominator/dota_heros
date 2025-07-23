import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const HeroForm = ({ show, onHide, onSubmit, initial }) => {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [lore, setLore] = useState(initial?.lore || '');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, lore, image });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initial ? 'Редактировать героя' : 'Добавить героя'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Имя героя</Form.Label>
            <Form.Control value={name} onChange={e => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control as="textarea" rows={2} value={description} onChange={e => setDescription(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Lore (история)</Form.Label>
            <Form.Control as="textarea" rows={3} value={lore} onChange={e => setLore(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Картинка героя</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} {...(initial ? {} : { required: true })} />
          </Form.Group>
          <Button type="submit" variant="success" className="w-100">{initial ? 'Сохранить' : 'Добавить'}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default HeroForm; 