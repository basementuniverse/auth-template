import loadable from '@loadable/component';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { ProtectedRoute } from './components';
import { AuthProvider } from './contexts/auth';

const Home = loadable(() => import('./routes/Home'));
const Action = loadable(() => import('./routes/Action'));
const Register = loadable(() => import('./routes/Register'));
const Login = loadable(() => import('./routes/Login'));
const VerifyEmail = loadable(() => import('./routes/VerifyEmail'));
const ForgotPassword = loadable(() => import('./routes/ForgotPassword'));
const ResetPassword = loadable(() => import('./routes/ResetPassword'));
const Dashboard = loadable(() => import('./routes/Dashboard'));

const App = () => {
  return (
    <Router>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/action" element={<Action />} />
            <Route
              path="/register"
              element={
                <ProtectedRoute
                  requireLoggedIn={false}
                  redirectPath="/dashboard"
                >
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  requireLoggedIn={false}
                  redirectPath="/dashboard"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verify-email"
              element={
                <ProtectedRoute
                  requireLoggedIn={false}
                  redirectPath="/dashboard"
                >
                  <VerifyEmail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRoute
                  requireLoggedIn={false}
                  redirectPath="/dashboard"
                >
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute
                  requireLoggedIn={false}
                  redirectPath="/dashboard"
                >
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requireLoggedIn={true} redirectPath="/login">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </QueryParamProvider>
    </Router>
  );
};

export default App;
