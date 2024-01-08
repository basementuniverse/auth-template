import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

type ProtectedRouteProps = {
  children: ReactElement;
  requireLoggedIn?: boolean;
  requireAdmin?: boolean;
  redirectPath?: string;
};

export function ProtectedRoute({
  children,
  requireLoggedIn,
  requireAdmin,
  redirectPath,
}: ProtectedRouteProps): ReactElement {
  const { loggedIn, user } = useAuth();

  return loggedIn === !!requireLoggedIn ? (
    children
  ) : (
    <Navigate to={redirectPath ?? '/'} />
  );
}
