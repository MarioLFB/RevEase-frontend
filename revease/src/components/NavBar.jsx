import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from './login';
import LogoutButton from './Logout';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/components/Navigation.css';

function Navigation() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <Navbar expand="lg" className="navbar-transparent shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4">
          REVease
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="fs-5">Home</Nav.Link>
            <Nav.Link href="#about" className="fs-5">About</Nav.Link>
            <Nav.Link href="#services" className="fs-5">Services</Nav.Link>
            <NavDropdown title="More" id="nav-dropdown" className="fs-5">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {user ? (
              <LogoutButton className="btn btn-outline-dark me-2" />
            ) : (
              <Login className="btn btn-outline-dark me-2" />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
