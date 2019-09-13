import React, { Component, Fragment } from 'react';
import Routes from './Routes';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Nav from 'react-bootstrap/Nav';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import NavLink from 'react-bootstrap/NavLink';
import { Auth } from 'aws-amplify';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';
 
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  changeAuthStatus = auth => {
    this.setState({ loggedIn: auth });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.authStatus(false);
    this.props.history.push("/login");
  }

  render() {
    const props = {
      changeAuthStatus: this.changeAuthStatus,
      loggedIn: this.loggedIn
    }

    return (
      <div>
        <Navbar 
          bg="light"
          fluid
          collapseOnSelect
        >
          <NavbarBrand href="/home">TI4</NavbarBrand>
            <NavbarCollapse className = "justify-content-end">
              {!this.state.loggedIn
              ?
              <Fragment>     
                <Nav>
                <LinkContainer to="/login">
                  <NavLink>Login</NavLink>
                </LinkContainer>
                </Nav>
                <Nav>
                <LinkContainer to="/register">
                  <NavLink>Register</NavLink>
                </LinkContainer>
                </Nav>
              </Fragment>
              :
              <Nav>
                <NavLink onClick={this.handleLogout}>Logout</NavLink>
              </Nav>
              }
            </NavbarCollapse>
        </Navbar>
        <Routes props={props}/>
    </div>
    );
  }
}

export default withRouter(App);
