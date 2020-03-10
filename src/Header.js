import React, {Component} from "react";

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse
} from "shards-react";

import { Link } from "react-router-dom";


export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown = () => {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar = () => {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    return (
      <Navbar type="dark" expand="lg" className="Header">
        <Link to="/" className="navbar-brand">
        TCO-kalkylatorn
        </Link>
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            <NavItem>
           
              <Link to="/sok" className="nav-link">
                Sök
              </Link>
         
            </NavItem>
            <NavItem>
              <Link to="/jamfor" className="nav-link">
                Jämför
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/" className="nav-link">
                Vad är TCO?
              </Link>
            </NavItem>
            
          </Nav>

          <Nav navbar className="ml-auto">
          <NavItem>
              <Link to="/" className="nav-link">
                Om verktyget
              </Link>
            </NavItem>
            
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}