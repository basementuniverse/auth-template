import {
  AuthError as FirebaseAuthError,
  User as FirebaseUser,
} from 'firebase/auth';
import { User } from './user';

export type AuthContextState = {
  pending: boolean;
  loggedIn: boolean;
  user: FirebaseUser | null;
  error: Error | FirebaseAuthError | null;
  token: string | null;
  register: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<User | void>;
  forgotPassword: (email: string) => Promise<void>;
  loginWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithGithub: () => Promise<boolean>;
  logout: () => Promise<void>;
};
