import { AssistantChat, Chat } from '@src/features/chat';
import { CBTRecommendationChat } from '@src/features/chat/types';

import { apiClient } from './client';
import { ROUTES } from './route';

export interface QuotaResponse {
  quota: number;
  timeToRefill: string;
}

export const chatAPI = {
  getChatHistory: async (): Promise<(Chat | CBTRecommendationChat)[]> => {
    const response: { content: (Chat | CBTRecommendationChat)[] } =
      await apiClient.get(ROUTES.CHATS);
    return response.content;
  },
  sendMessage: async (message: string): Promise<AssistantChat> => {
    const response: AssistantChat = await apiClient.post(ROUTES.CHATS, {
      message,
    });
    return response;
  },
  getRemainingQuota: async (): Promise<QuotaResponse> => {
    const response: QuotaResponse = await apiClient.get(ROUTES.QUOTA);
    return response;
  },
};
