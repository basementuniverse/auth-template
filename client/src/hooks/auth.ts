import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { AuthContextState } from '../types';

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
