import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Login from './login';
import LogoutButton from './Logout';
import { AuthContext } from '../context/AuthContext'; 

function Navigation() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          React Bootstrap
        </Navbar.Brand>
        {user ? ( 
          <LogoutButton />
        ) : (
          <Login />
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
