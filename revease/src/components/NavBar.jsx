import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          React Bootstrap
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Navigation;
