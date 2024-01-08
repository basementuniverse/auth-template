import { FormEvent, ReactElement, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export default function Login(): ReactElement {
  const {
    pending,
    error,
    loginWithEmailAndPassword,
    loginWithGoogle,
    loginWithGithub,
  } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = Object.fromEntries(
        new FormData(e.currentTarget).entries()
      );

      const result = await loginWithEmailAndPassword(
        formData.email.toString(),
        formData.password.toString()
      );

      if (result) {
        navigate('/dashboard');
      }
    },
    [loginWithEmailAndPassword]
  );

  const handleLoginWithGoogle = useCallback(async () => {
    const result = await loginWithGoogle();

    if (result) {
      navigate('/dashboard');
    }
  }, [loginWithGoogle]);

  const handleLoginWithGithub = useCallback(async () => {
    const result = await loginWithGithub();

    if (result) {
      navigate('/dashboard');
    }
  }, [loginWithGithub]);

  return (
    <>
      <h1>Sign in</h1>
      {pending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
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
        <button type="submit">Sign in</button>
      </form>
      <p>
        <button onClick={handleLoginWithGoogle}>Login with Google</button>
      </p>
      <p>
        <button onClick={handleLoginWithGithub}>Login with Github</button>
      </p>
      <p>
        <Link to="/forgot-password">Forgotten password?</Link>
      </p>
      <p>
        No account? <Link to="/register">Register now.</Link>
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
    </>
  );
}
