/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Navbar, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

function NavigationBar() {
  return (
    <Navbar style={{ paddingLeft: 20, paddingRight: 20 }} collapseOnSelect bg="dark" data-bs-theme="dark">
      <Navbar.Brand href="/" />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Image
            src="/IndieLogo2.png"
            height={100}
            width={100}
          />
          {/* <Nav.Link href="/showForm">Add Show</Nav.Link>
          <Nav.Link href="/showFullTour">View Full Tour</Nav.Link>
          <Nav.Link href="/dashboard">DashTest</Nav.Link> */}
        </Nav>
        <Button variant="danger" onClick={signOut}>Sign Out</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
