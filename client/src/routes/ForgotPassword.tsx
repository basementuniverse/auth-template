import { FormEvent, ReactElement, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export default function ForgotPassword(): ReactElement {
  const { pending, error, forgotPassword } = useAuth();

  const [done, setDone] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = Object.fromEntries(
        new FormData(e.currentTarget).entries()
      );
      await forgotPassword(formData.email.toString());

      setDone(true);
    },
    [forgotPassword]
  );

  return (
    <>
      <h1>Forgot password</h1>
      {pending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {done && <p>Check your email for a reset link.</p>}
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
        <button type="submit">Forgotten password</button>
      </form>
      <p>
        <Link to="/">Home</Link>
      </p>
    </>
  );
}
