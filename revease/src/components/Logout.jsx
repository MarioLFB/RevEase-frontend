import React from 'react';
import { logout } from '../services/auth';

const LogoutButton = () => {

    const handleLogout = async () => {
        try {
            await logout(); 
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
