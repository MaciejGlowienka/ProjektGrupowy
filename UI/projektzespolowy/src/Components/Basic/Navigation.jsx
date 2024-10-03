import {Container, Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation(isAuthenticated) {
  return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">      
            <Nav.Link href="/Kanban">Kanban</Nav.Link>
          </Nav>
          <Nav>      
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/Register">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Navigation;
