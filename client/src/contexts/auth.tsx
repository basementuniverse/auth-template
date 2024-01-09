import {
  AuthError as FirebaseAuthError,
  User as FirebaseUser,
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import config from '../config';
import { useLocalStorage } from '../hooks/local-storage';
import { AuthContextState, User } from '../types';
import firebase from '../utilities/firebase';

export const AuthContext = createContext<AuthContextState | undefined>(
  undefined
);

type AuthProviderProps = {
  children?: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const auth = getAuth(firebase);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [error, setError] = useState<Error | FirebaseAuthError | null>(null);
  const [pending, setPending] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cachedToken, setCachedToken, clearCachedToken] = useLocalStorage(
    'auth-token',
    ''
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
      displayName: string
    ): Promise<User | void> => {
      setPending(true);

      return fetch(`${config.api.url}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, displayName }),
      })
        .then(async response => {
          setPending(false);
          setError(null);

          if (!response.ok) {
            setError(new Error(await response.text()));
            return;
          }

          return (await response.json()) as User;
        })
        .catch((error: Error) => {
          setPending(false);
          setError(error);
        });
    },
    []
  );

  const forgotPassword = useCallback(async (email: string): Promise<void> => {
    setPending(true);

    fetch(`${config.api.url}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(async response => {
        setPending(false);
        setError(null);

        if (!response.ok) {
          setError(new Error(await response.text()));
        }

        return;
      })
      .catch((error: Error) => {
        setPending(false);
        setError(error);
      });
  }, []);

  const loginWithEmailAndPassword = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setPending(true);

      let result: UserCredential;

      try {
        result = await signInWithEmailAndPassword(auth, email, password);
      } catch (error: unknown) {
        setPending(false);
        setError(error as FirebaseAuthError);
        clearCachedToken();

        return false;
      }

      setPending(false);
      setError(null);
      setCachedToken((await result.user.getIdToken(true)) ?? '');

      return true;
    },
    [auth, clearCachedToken, setCachedToken]
  );

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    setPending(true);

    const provider = new GoogleAuthProvider();
    let result: UserCredential;

    try {
      result = await signInWithPopup(auth, provider);
    } catch (error: unknown) {
      setPending(false);
      setError(error as FirebaseAuthError);
      clearCachedToken();

      return false;
    }

    setPending(false);
    setError(null);
    setCachedToken(await result.user.getIdToken(true));

    return true;
  }, [auth, clearCachedToken, setCachedToken]);

  const loginWithGithub = useCallback(async (): Promise<boolean> => {
    setPending(true);

    const provider = new GithubAuthProvider();
    let result: UserCredential;

    try {
      result = await signInWithPopup(auth, provider);
    } catch (error: unknown) {
      setPending(false);
      setError(error as FirebaseAuthError);
      clearCachedToken();

      return false;
    }

    setPending(false);
    setError(null);
    setCachedToken(await result.user.getIdToken(true));

    return true;
  }, [auth, clearCachedToken, setCachedToken]);

  const logout = useCallback(async (): Promise<void> => {
    setPending(true);

    signOut(auth).then(() => {
      setPending(false);
    });
  }, [auth]);

  useEffect(() => {
    setPending(true);

    onAuthStateChanged(auth, user => {
      setUser(user);
      setLoggedIn(!!user);
      setPending(false);
      setCachedToken(user?.getIdToken(true) ?? '');
    });
  }, [auth, setCachedToken]);

  return (
    <AuthContext.Provider
      value={{
        pending,
        loggedIn,
        user,
        error,
        token: cachedToken,
        register,
        forgotPassword,
        loginWithEmailAndPassword,
        loginWithGoogle,
        loginWithGithub,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
