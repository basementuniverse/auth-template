import { FormEvent, ReactElement, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export default function Register(): ReactElement {
  const { pending, error, register } = useAuth();

  const [done, setDone] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = Object.fromEntries(
        new FormData(e.currentTarget).entries()
      );
      await register(
        formData.email.toString(),
        formData.password.toString(),
        formData.displayName.toString()
      );

      setDone(true);
    },
    [register]
  );

  return (
    <>
      <h1>Register</h1>
      {pending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {done && (
        <p>
          Registration complete!
          <Link to="/dashboard">Dashboard</Link>
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            required
            autoFocus
          />
        </section>
        <section>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            autoFocus
          />
        </section>
        <section>
          <label htmlFor="displayName">Name</label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            autoComplete="displayName"
            required
            autoFocus
          />
        </section>
        <button type="submit">Register</button>
      </form>
      <p>
        <Link to="/">Home</Link>
      </p>
    </>
  );
}
