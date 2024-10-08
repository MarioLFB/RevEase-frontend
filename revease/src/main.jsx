import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './containers/Home'
import Register from './containers/Register';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import './assets/styles/global.css';


import { login, register, logout } from './services/auth';

window.login = login;
window.register = register;
window.logout = logout;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
