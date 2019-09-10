import React, { Component } from 'react';
import {Navbar, NavDropdown, Nav, } from 'react-bootstrap';

class HeaderBar extends React.Component{
    render(){
        return( 
          <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">ThermoSmart</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/program">Programs</Nav.Link>
              <NavDropdown title="Charts" id="basic-nav-dropdown">
                <NavDropdown.Item href="/chart">Real-Time</NavDropdown.Item>
                <NavDropdown.Item href="/chart24">Today</NavDropdown.Item>
                <NavDropdown.Item href="/chart_custom">Custom Chart</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default HeaderBar; 