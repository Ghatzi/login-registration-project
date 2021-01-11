import { ErrorHandler, SuccessHandler } from '../misc/msgHandler';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const RegisterForm = ({
  values,
  handleChange,
  handleSubmit,
  success,
  errors
}) => {
  const { name, email, username, password, passwordCheck } = values;

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      {errors && <ErrorHandler message={errors} />}
      {success && <SuccessHandler message={success} />}
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="name"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          placeholder="enter name..."
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          placeholder="enter email..."
        />
      </FormGroup>
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
      <FormGroup>
        <Label for="passwordCheck">Confirm Password</Label>
        <Input
          type="password"
          name="passwordCheck"
          id="passwordCheck"
          value={passwordCheck}
          onChange={handleChange}
          placeholder="confirm password..."
        />
      </FormGroup>
      <Button color="primary">Register</Button>
    </Form>
  );
};

export default RegisterForm;
