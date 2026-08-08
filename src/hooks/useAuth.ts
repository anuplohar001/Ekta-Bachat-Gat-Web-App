import { useCallback, useEffect, useState } from 'react';
import { loginApi, logoutApi } from '../api/auth';
import {
  clearSession,
  getStoredMember,
  getToken,
  refreshAccessToken,
  setStoredMember,
  setToken,
} from '../api/httpClient';
import type { AuthResponse } from '../api/types';
import { toErrorMessage } from '../utils/errorMessages';

export interface UseAuthResult {
  member: AuthResponse | null;
  loading: boolean;
  error: string | null;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthResult {
  const [member, setMember] = useState<AuthResponse | null>(() =>
    getStoredMember<AuthResponse>()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) return;
    let cancelled = false;
    refreshAccessToken()
      .then(() => {
        if (!cancelled) setMember(getStoredMember<AuthResponse>());
      })
      .catch(() => {
        if (!cancelled) {
          clearSession();
          setMember(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (phone: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginApi({ phone, password });
      setToken(response.authToken);
      setStoredMember(response);
      setMember(response);
    } catch (err) {
      setError(toErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      // clear local session regardless of network outcome
    } finally {
      clearSession();
      setMember(null);
      setError(null);
    }
  }, []);

  return { member, loading, error, login, logout };
}
