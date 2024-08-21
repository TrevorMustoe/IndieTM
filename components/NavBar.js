/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Navbar, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

function NavigationBar() {
  return (
    <Navbar style={{ paddingLeft: 20, paddingRight: 20 }} collapseOnSelect bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Navbar.Brand href="/">
        <Image src="/IndieLogo2.png" height={40} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/showForm">Add Show</Nav.Link>
          <Nav.Link href="/showFullTour">View Full Tour</Nav.Link>
        </Nav>
        <Button variant="danger" onClick={signOut}>Sign Out</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
