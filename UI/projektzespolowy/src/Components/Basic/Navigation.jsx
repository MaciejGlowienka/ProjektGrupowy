import React, { useState, useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LoginModal from '../General/LoginModal';
import RegisterModal from '../General/RegisterModal';
import LogoutButton from '../General/LogoutButton';
import { AuthContext } from '../Authorization/AuthContext';
import "./navbar.css"
function Navigation() {
    const { isAuthenticated } = useContext(AuthContext);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    return (
        <>
            <Navbar className="navbar-custom">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">Kanban Board</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/Kanban">Kanban</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <LogoutButton />
                        ) : (
                            <>
                                <Nav.Link onClick={() => setShowLoginModal(true)}>Zaloguj</Nav.Link>
                                <Nav.Link onClick={() => setShowRegisterModal(true)}>Zarejestruj</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
            <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
            <RegisterModal show={showRegisterModal} handleClose={() => setShowRegisterModal(false)} />
        </>
    );
}

export default Navigation;


