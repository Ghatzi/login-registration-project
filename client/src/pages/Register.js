import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { Container } from 'reactstrap';
import axios from 'axios';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordCheck: ''
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios({
        url: '/users/register',
        method: 'POST',
        data: { ...values }
      }).then(() => {
        setSuccess(true);
        setErrors(false);
        resetUserInputs();
      });
    } catch (err) {
      err.response.data.msg && setErrors(err.response.data.msg);
      setSuccess(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  const resetUserInputs = () => {
    setValues({
      name: '',
      email: '',
      username: '',
      password: '',
      passwordCheck: ''
    });
  };

  return (
    <Container>
      <h1 className="mt-4">Register</h1>
      <RegisterForm
        values={values}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        success={success}
        errors={errors}
      />
      <p className="mt-3">
        Have an Account?{' '}
        <Link to="/login" title="Login">
          Login
        </Link>
      </p>
    </Container>
  );
};

export default Register;
