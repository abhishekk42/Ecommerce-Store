import { store } from '../data/store.js';

export const getAllProducts = (req, res) => {
  res.json(store.products);
};