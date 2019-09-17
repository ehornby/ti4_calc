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
      loggedIn: false,
      inProgress: false
    };
  }

  changeAuthStatus = auth => {
    this.setState({ loggedIn: auth });
  }

  changeProgressStatus = prog => {
    this.setState({ inProgress: prog });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.changeAuthStatus(false);
    this.props.history.push("/login");
  }

  // Will need to save inProgress state in a users table, and make a DB
  // call to retrieve on page load
  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.changeAuthStatus(true);
    }
    catch (e) {
      if (e!== 'No current user') {
        alert(e);
      }
    }
  }

  render() {
    const props = {
      changeAuthStatus: this.changeAuthStatus,
      loggedIn: this.state.loggedIn,
      inProgress: this.state.inProgress,
      changeProgressStatus: this.changeProgressStatus
    }

    return (
      <div>
        <Navbar 
          bg="light"
          fluid
          collapseOnSelect
        >
          <NavbarBrand href="/">TI4</NavbarBrand>
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
              <Fragment>
                <Nav>
                  <LinkContainer to="/new">
                    <NavLink>
                      {!this.state.inProgress 
                      ? 
                      "New Game" 
                      : 
                      "Continue Game"}
                      </NavLink>
                  </LinkContainer>
                </Nav>
                <Nav>
                  <LinkContainer to="/results">
                      <NavLink>Results</NavLink>
                  </LinkContainer>
                </Nav>
                <Nav>
                  <NavLink onClick={this.handleLogout}>Logout</NavLink>
                </Nav>
              </Fragment>
              }
            </NavbarCollapse>
        </Navbar>
        <Routes props={props}/>
    </div>
    );
  }
}

export default withRouter(App);
