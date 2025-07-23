import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import userStore from '../store/userStore';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const AppNavbar = observer(() => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userStore.logout();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">DotaWiki</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Герои</Nav.Link>
          </Nav>
          <Nav>
            {userStore.isAuth ? (
              <>
                <Nav.Link as={Link} to="/profile">Профиль</Nav.Link>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>Выйти</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Вход</Nav.Link>
                <Nav.Link as={Link} to="/register">Регистрация</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default AppNavbar; 