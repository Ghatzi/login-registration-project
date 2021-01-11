import { ErrorHandler } from '../misc/msgHandler';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const LoginForm = ({ values, handleChange, handleSubmit, errors }) => {
  const { username, password } = values;

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      {errors && <ErrorHandler message={errors} />}
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
          placeholder="enter username..."
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
          placeholder="enter password..."
        />
      </FormGroup>
      {!username || !password ? (
        <Button color="secondary" disabled>
          Login
        </Button>
      ) : (
        <Button color="primary">Login</Button>
      )}
    </Form>
  );
};

export default LoginForm;
