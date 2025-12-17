import { Chat } from '@src/features/chat';

import { apiClient } from './client';
import { ROUTES } from './route';

export interface ChatResponse {
  messages: Chat[];
}

export interface QuotaResponse {
  quota: number;
  timeToRefill: string;
}

export const chatAPI = {
  getChatHistory: async (): Promise<Chat[]> => {
    const response: ChatResponse = await apiClient.get(ROUTES.CHATS);
    return response.messages;
  },
  sendMessage: async (message: string): Promise<Chat[]> => {
    const response: ChatResponse = await apiClient.post(ROUTES.CHATS, {
      message,
    });
    return response.messages;
  },
  getRemainingQuota: async (): Promise<QuotaResponse> => {
    const response: QuotaResponse = await apiClient.get(ROUTES.QUOTA);
    return response;
  },
};
