// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const getProducts = async () => {
  try {
    const response = await api.get('products/');
    return response.data.results; 
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; 
  }
};
