import React from 'react';
import { logout } from '../services/auth';

const LogoutButton = ({ setIsAuthenticated }) => {
  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      alert("Logout done!");
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
