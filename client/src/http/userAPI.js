import { $host, $authHost } from './index';

export const registration = async (login, password) => {
  const { data } = await $host.post('user/registration', { login, password });
  localStorage.setItem('token', data.token);
  return data;
};

export const loginUser = async (login, password) => {
  const { data } = await $host.post('user/login', { login, password });
  localStorage.setItem('token', data.token);
  return data;
};

export const check = async () => {
  const { data } = await $authHost.get('user/auth');
  localStorage.setItem('token', data.token);
  return data;
}; 