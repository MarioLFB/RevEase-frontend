import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './containers/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { login, register, logout } from './services/auth';

// Exponha as funções de autenticação no console do navegador
window.login = login;
window.register = register;
window.logout = logout;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
