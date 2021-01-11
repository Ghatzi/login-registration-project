import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Update from './pages/Update';
import Landing from './pages/Landing';
import NavBar from './components/NavBar';
import UserContext from './context/UserContext';
import axios from 'axios';

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');

      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }

      const tokenRes = await axios.post('/users/tokenIsValid', null, {
        headers: { 'x-auth-token': token }
      });
      if (tokenRes.data) {
        const userRes = await axios.get('/users/', {
          headers: { 'x-auth-token': token }
        });
        setUserData({
          token,
          user: userRes.data
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <NavBar />
        <div className="base-layout">
          <Container>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/update" component={Update} />
              <Route path="/landing" component={Landing} />
            </Switch>
          </Container>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
