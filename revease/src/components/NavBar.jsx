import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Login from './login';
import LogoutButton from './Logout';

function Navigation() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          React Bootstrap
          <Login />
          <LogoutButton />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Navigation;
