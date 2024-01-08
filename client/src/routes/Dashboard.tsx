import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../hooks/auth';

export default function Dashboard(): ReactElement {
  const { user, token, logout } = useAuth();

  const [pending, setPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [dashboardResponse, setDashboardResponse] = useState<any>(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`${config.api.url}/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-auth-token': token ?? '',
      },
      signal: abortController.signal,
    })
      .then(async response => {
        setPending(false);
        setError(null);

        if (!response.ok) {
          setError(new Error(await response.text()));
          return;
        }

        setDashboardResponse(await response.json());
      })
      .catch(error => {
        setPending(false);

        if (error.name === 'AbortError') {
          return;
        }

        setError(error);
      });

    return () => abortController.abort();
  }, [token]);

  return (
    <>
      Dashboard
      {pending && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(dashboardResponse, null, 2)}</pre>
      <p>
        <button onClick={logout}>Logout</button>
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
    </>
  );
}
