import { create } from 'zustand';
import { auth } from '../lib/api';
import type { User } from '../types/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  login: async (username, password) => {
    const response = await auth.login({ username, password });
    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    // Fetch user data after login
    const userResponse = await fetch('http://localhost:8000/api/v1/accounts/me/', {
      headers: {
        Authorization: `Bearer ${response.access}`,
      },
    });
    const userData = await userResponse.json();
    set({ user: userData, isAuthenticated: true });
  },
  signup: async (credentials) => {
    await auth.signup(credentials);
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ user: null, isAuthenticated: false });
  },
}));