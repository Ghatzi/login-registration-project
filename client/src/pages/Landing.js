import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Jumbotron, Container } from 'reactstrap';

const Landing = () => {
  const { userData } = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push('/login');
    }
  });

  const myStyle = {
    height: '500px'
  };

  const layout = {
    padding: '1.8rem'
  };

  return (
    <Jumbotron fluid style={layout}>
      <Container>
        {userData.user ? (
          <h1 className="mt-4">Hi {userData.user.username}</h1>
        ) : (
          ''
        )}
        <p>
          You have successfully registered and signed into my site using
          tokenization. Your details have been stored securely (hashed password)
          into my MongoDB database. Please come back soon to see more updates to
          this project.
        </p>

        <img
          src="simon-abrams-k_T9Zj3SE8k-unsplash.jpg"
          alt="the-devlab"
          style={myStyle}
        />
      </Container>
    </Jumbotron>
  );
};

export default Landing;
