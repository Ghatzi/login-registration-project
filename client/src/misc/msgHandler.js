import { Alert } from 'reactstrap';

export const ErrorHandler = props => (
  <Alert color="danger">{props.message}</Alert>
);

export const SuccessHandler = () => (
  <Alert color="success">User registered, you can now login.</Alert>
);
