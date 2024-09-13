/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Navbar, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

function NavigationBar() {
  return (
    <Navbar style={{ paddingLeft: 20, paddingRight: 20 }} collapseOnSelect bg="dark" data-bs-theme="dark">
      <Navbar.Brand href="/" />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Button variant="danger" onClick={signOut}>Sign Out</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
