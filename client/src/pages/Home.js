import { Jumbotron, Container } from 'reactstrap';

const Home = () => {
  const myStyle = {
    height: '500px'
  };

  const layout = {
    padding: '1.8rem'
  };

  return (
    <Jumbotron fluid style={layout}>
      <Container fluid>
        <h1 className="display-3">the-DevLab</h1>
        <p className="lead">Register & Sign In forms using MongoDB</p>
        <img
          src="avi-richards-Z3ownETsdNQ-unsplash.jpg"
          alt="the-devlab"
          style={myStyle}
        />
      </Container>
    </Jumbotron>
  );
};

export default Home;
