import { apiRequest } from './httpClient';
import type { AuthResponse } from './types';

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  number: number;
  phone: string;
  monthlySaving: number;
  password: string;
}

export const loginApi = (credentials: LoginCredentials): Promise<AuthResponse> =>
  apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const registerApi = (input: RegisterInput): Promise<AuthResponse> =>
  apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  });

export const logoutApi = (): Promise<{ message: string }> =>
  apiRequest<{ message: string }>('/auth/logout', {
    method: 'POST',
  });
