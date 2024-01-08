import { applyActionCode, getAuth } from 'firebase/auth';
import { ReactElement, useEffect, useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import firebase from '../utilities/firebase';

export default function VerifyEmail(): ReactElement {
  const [actionCode] = useQueryParam('actionCode', StringParam);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!actionCode) {
      return;
    }

    const auth = getAuth(firebase);
    applyActionCode(auth, actionCode)
      .then(() => {
        setDone(true);
      })
      .catch(() => {
        setError('Invalid action code.');
      });
  }, [actionCode]);

  return (
    <>
      <h1>Verify email</h1>
      {!done && !error && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {done && <p>Your email has been verified.</p>}
    </>
  );
}
