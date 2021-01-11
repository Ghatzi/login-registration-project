import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import UserContext from '../context/UserContext';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem('auth-token', '');
  };

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link to="/" title="Home" className="nav-link">
              Home
            </Link>
          </NavItem>
          {userData.user ? (
            <>
              <NavItem>
                <Link to="/landing" title="Landing" className="nav-link">
                  Landing
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/login"
                  title="Logout"
                  className="nav-link"
                  onClick={logout}
                >
                  Logout
                </Link>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <Link to="/login" title="Login" className="nav-link">
                  Login
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/register" title="Register" className="nav-link">
                  Register
                </Link>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
