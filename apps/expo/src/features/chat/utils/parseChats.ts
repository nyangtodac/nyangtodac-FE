import { ROLE } from '../constants';
import type { CBTRecommendationChat, Chat, ChatUI } from '../types';
import { CHAT_TYPE } from '../types/chat-type';

export const parseChats = (
  chats: (Chat | CBTRecommendationChat)[],
): ChatUI[] => {
  const stack: ChatUI[] = [];

  for (const chat of chats) {
    if (chat.type === CHAT_TYPE.CHAT && chat.sender === ROLE.AI) {
      const messages = chat.message.split(/(?<=[!?.])\s*/);
      stack.push({
        type: CHAT_TYPE.CHAT,
        sender: ROLE.AI,
        messages,
        time: chat.time,
      });
      continue;
    }

    stack.push(chat as ChatUI);
  }

  return stack;
};
