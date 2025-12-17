import { apiClient } from './client';

export const userAPI = {
  sendMessage: async (message: string) => {
    console.log('message: ', message);
    const response = await apiClient.post('/chats', { message });
    return response.messages;
  },
};
