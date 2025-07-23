import { makeAutoObservable } from 'mobx';
import { check } from '../http/userAPI';
import jwt_decode from 'jwt-decode';

class UserStore {
  user = null;
  isAuth = false;
  isAdmin = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.user = user;
    this.isAuth = !!user;
    this.isAdmin = user?.role === 'ADMIN';
  }

  async checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return;
    }
    try {
      const data = await check();
      // Если сервер возвращает user, используем его, иначе декодируем токен
      const user = data.user || jwt_decode(data.token);
      this.setUser(user);
      localStorage.setItem('token', data.token);
    } catch (e) {
      this.logout();
      localStorage.removeItem('token');
    }
  }

  logout() {
    this.user = null;
    this.isAuth = false;
    this.isAdmin = false;
    localStorage.removeItem('token');
  }
}

export default new UserStore(); 