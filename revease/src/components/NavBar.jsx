import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Login from './login';
import LogoutButton from './Logout';

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          React Bootstrap
        </Navbar.Brand>
        {isAuthenticated ? (
          <LogoutButton setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <Login setIsAuthenticated={setIsAuthenticated} />
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
