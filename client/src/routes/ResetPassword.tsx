import {
  confirmPasswordReset,
  getAuth,
  verifyPasswordResetCode,
} from 'firebase/auth';
import {
  FormEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';
import firebase from '../utilities/firebase';

export default function ResetPassword(): ReactElement {
  const [actionCode] = useQueryParam('actionCode', StringParam);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!actionCode) {
      return;
    }

    const auth = getAuth(firebase);
    verifyPasswordResetCode(auth, actionCode)
      .then(() => {
        setReady(true);
      })
      .catch(() => {
        setError('Invalid action code.');
      });
  }, [actionCode]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!actionCode) {
        return;
      }

      setPending(true);

      const formData = Object.fromEntries(
        new FormData(e.currentTarget).entries()
      );

      const auth = getAuth(firebase);
      confirmPasswordReset(auth, actionCode, formData.newPassword.toString())
        .then(() => {
          setPending(false);
          setDone(true);
        })
        .catch(error => {
          setError(error.toString());
        });
    },
    [actionCode]
  );

  const disabled = useMemo(
    () => !ready || done || pending,
    [ready, done, pending]
  );

  return (
    <>
      <h1>Forgot password</h1>
      {pending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {done && (
        <p>
          Your password has been reset.
          <Link to="/login">Login</Link>
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="newPassword">New password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            autoFocus
            disabled={disabled}
          />
        </section>
        <button type="submit">Reset password</button>
      </form>
      <p>
        <Link to="/">Home</Link>
      </p>
    </>
  );
}
