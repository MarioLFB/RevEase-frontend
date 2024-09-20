import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './containers/Home'
import Register from './containers/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/NavBar';


import { login, register, logout } from './services/auth';

// Exponha as funções de autenticação no console do navegador
window.login = login;
window.register = register;
window.logout = logout;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
