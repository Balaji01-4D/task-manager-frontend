import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BsNavbar, Container, Nav } from 'react-bootstrap';
import { BsCheckSquare, BsGithub } from 'react-icons/bs';

const Navbar = () => {
    const location = useLocation();

    return (
        <BsNavbar bg="white" variant="light" expand="lg" fixed="top" className="navbar">
            <Container>
                <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <BsCheckSquare className="me-2" size={24} />
                    <Link to="/" className="text-decoration-none text-dark">Task Manager</Link>
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={location.pathname === '/' ? 'active' : ''}
                        >
                            Tasks
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link
                            href="https://github.com/Balaji01-4D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                            aria-label="GitHub Profile"
                        >
                            <BsGithub size={20} />
                        </Nav.Link>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};

export default Navbar;
