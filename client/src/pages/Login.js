import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import LoginForm from '../components/LoginForm';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState(false);

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios({
        url: '/users/login',
        method: 'POST',
        data: { ...values }
      }).then(res => {
        setErrors(false);
        setUserData({
          token: res.data.token,
          user: res.data.user
        });
        localStorage.setItem('auth-token', res.data.token);
        history.push('/landing');
      });
    } catch (err) {
      err.response.data.msg && setErrors(err.response.data.msg);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  return (
    <Container>
      <h1 className="mt-4">Login</h1>
      <LoginForm
        values={values}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
      />
      <p className="mt-3">
        Don't have an Account?{' '}
        <Link to="/register" title="Register">
          Register
        </Link>
      </p>
    </Container>
  );
};

export default Login;
