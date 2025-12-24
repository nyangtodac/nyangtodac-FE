import { storage } from '../store';

export const ACCESS_TOKEN_KEY = 'accessToken';

export const REFRESH_TOKEN_KEY = 'refreshToken';

export const getAccessToken = () => {
  const accessToken = storage.getString(ACCESS_TOKEN_KEY);
  if (!accessToken) {
    return null;
  }

  return accessToken;
};

export const getRefreshToken = () => {
  const refreshToken = storage.getString(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    return null;
  }

  return refreshToken;
};

export const setAuthToken = (accessToken: string, refreshToken: string) => {
  storage.set(ACCESS_TOKEN_KEY, accessToken);
  storage.set(REFRESH_TOKEN_KEY, refreshToken);
};
