import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function Home(): ReactElement {
  return (
    <>
      Home
      <p>
        <Link to="/login">Login</Link>
      </p>
      <p>
        <Link to="/register">Register</Link>
      </p>
    </>
  );
}
