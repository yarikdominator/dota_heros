import { $host, $authHost } from './index';

export const fetchHeroes = async () => {
  const { data } = await $host.get('hero');
  return data;
};

export const fetchHero = async (id) => {
  const { data } = await $host.get(`hero/${id}`);
  return data;
};

export const createHero = async (hero) => {
  const formData = new FormData();
  formData.append('name', hero.name);
  formData.append('description', hero.description);
  formData.append('lore', hero.lore);
  formData.append('image', hero.image);
  const { data } = await $authHost.post('hero', formData);
  return data;
};

export const updateHero = async (id, hero) => {
  const formData = new FormData();
  formData.append('name', hero.name);
  formData.append('description', hero.description);
  formData.append('lore', hero.lore);
  if (hero.image) formData.append('image', hero.image);
  const { data } = await $authHost.put(`hero/${id}`, formData);
  return data;
};

export const deleteHero = async (id) => {
  const { data } = await $authHost.delete(`hero/${id}`);
  return data;
}; 