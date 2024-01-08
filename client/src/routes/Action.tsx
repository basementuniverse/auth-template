import { ReactElement } from 'react';
import { Navigate } from 'react-router';
import { StringParam, useQueryParam } from 'use-query-params';

function Action(): ReactElement {
  const [mode] = useQueryParam('mode', StringParam);
  const [actionCode] = useQueryParam('oobCode', StringParam);

  switch (mode) {
    case 'verifyEmail':
      return <Navigate to={`/verify-email?actionCode=${actionCode}`} />;
    case 'resetPassword':
      return <Navigate to={`/reset-password?actionCode=${actionCode}`} />;
    default:
      break;
  }

  return <Navigate to="/" />;
}

export default Action;
