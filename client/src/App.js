import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import HeroPage from './pages/HeroPage';
import { observer } from 'mobx-react-lite';
import userStore from './store/userStore';
import { useEffect } from 'react';

const App = observer(() => {
  useEffect(() => {
    userStore.checkAuth();
  }, []);
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={userStore.isAuth ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      </div>
    </Router>
  );
});

export default App; 