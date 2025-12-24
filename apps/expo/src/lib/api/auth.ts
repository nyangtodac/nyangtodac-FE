import { getRefreshToken } from '../auth';
import { apiClient } from './client';

export const ROUTES = {
  REFRESH: '/tokens/reissue',
} as const;

export const authAPI = {
  reissueAuthToken: async (): Promise<string> => {
    const response = await apiClient.post(ROUTES.REFRESH, {
      refreshToken: getRefreshToken(),
    });

    return response.data;
  },
};
