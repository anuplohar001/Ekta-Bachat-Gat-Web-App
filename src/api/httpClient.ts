import { ApiError } from '../utils/apiError';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

const TOKEN_KEY = 'ebg_auth_token';
const MEMBER_KEY = 'ebg_member';

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);

export const getStoredMember = <T>(): T | null => {
  try {
    const raw = localStorage.getItem(MEMBER_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

export const setStoredMember = <T>(member: T): void =>
  localStorage.setItem(MEMBER_KEY, JSON.stringify(member));

export const clearSession = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(MEMBER_KEY);
};

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface RequestOptions extends RequestInit {
  auth?: boolean;
  retried?: boolean;
}

export async function refreshAccessToken(): Promise<string> {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  const body = (await response.json().catch(() => null)) as ApiEnvelope<{ authToken: string }> | null;

  if (!response.ok) {
    clearSession();
    throw new ApiError(body?.message ?? 'Session expired. Please login again.', response.status);
  }

  const token = body?.data?.authToken;
  if (!token) {
    clearSession();
    throw new ApiError('Failed to refresh session', 401);
  }

  setToken(token);
  return token;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { auth, retried, ...init } = options;
  const token = getToken();

  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,    
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
    credentials: 'include',
  });

  const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok) {
    if (auth && !retried && response.status === 401) {
      try {
        await refreshAccessToken();
        return apiRequest<T>(path, { ...options, retried: true });
      } catch {
        // refresh failed; fall through to throw the original error
      }
    }
    throw new ApiError(body?.message ?? `Request failed (${response.status})`, response.status);
  }

  return body?.data as T;
}
