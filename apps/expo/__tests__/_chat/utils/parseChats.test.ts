import { ROLE } from '../../../app/_chat/constants';
import type { AssistantChat, Chat, UserChat } from '../../../app/_chat/types';
import { parseChats } from '../../../app/_chat/utils/parseChats';

describe('parseChats', () => {
  describe('Happy Path - Basic Functionality', () => {
    it('should return empty array when given empty array', () => {
      const result = parseChats([]);
      expect(result).toEqual([]);
    });

    it('should parse a single user message', () => {
      const chats: Chat[] = [
        { sender: ROLE.USER, message: 'Hello', time: '12:00' },
      ];

      const result = parseChats(chats);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        sender: ROLE.USER,
        message: 'Hello',
        time: '12:00',
      } as UserChat);
    });

    it('should parse a single AI message', () => {
      const chats: Chat[] = [
        { sender: ROLE.AI, message: 'Hi there', time: '12:01' },
      ];

      const result = parseChats(chats);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        sender: ROLE.AI,
        messages: ['Hi there'],
        time: '12:01',
      } as AssistantChat);
    });

    it('should group consecutive AI messages together', () => {
      const chats: Chat[] = [
        { sender: ROLE.AI, message: 'Message 1', time: '12:00' },
        { sender: ROLE.AI, message: 'Message 2', time: '12:01' },
        { sender: ROLE.AI, message: 'Message 3', time: '12:02' },
      ];

      const result = parseChats(chats);

      expect(result).toHaveLength(1);
      const assistantChat = result[0] as AssistantChat;
      expect(assistantChat.sender).toBe(ROLE.AI);
      expect(assistantChat.messages).toEqual(['Message 1', 'Message 2', 'Message 3']);
      expect(assistantChat.time).toBe('12:00');
    });

    it('should maintain correct order when grouping AI messages', () => {
      const chats: Chat[] = [
        { sender: ROLE.AI, message: 'Third', time: '12:02' },
        { sender: ROLE.AI, message: 'Second', time: '12:01' },
        { sender: ROLE.AI, message: 'First', time: '12:00' },
      ];

      const result = parseChats(chats);

      expect(result).toHaveLength(1);
      const assistantChat = result[0] as AssistantChat;
      expect(assistantChat.messages).toEqual(['First', 'Second', 'Third']);
    });

    it('should separate AI message groups when interrupted by user message', () => {
      const chats: Chat[] = [
        { sender: ROLE.AI, message: 'AI 1', time: '12:00' },
        { sender: ROLE.AI, message: 'AI 2', time: '12:01' },
        { sender: ROLE.USER, message: 'User 1', time: '12:02' },
        { sender: ROLE.AI, message: 'AI 3', time: '12:03' },
        { sender: ROLE.AI, message: 'AI 4', time: '12:04' },
      ];

      const result = parseChats(chats);

      expect(result).toHaveLength(3);
      
      // First AI group
      const firstGroup = result[0] as AssistantChat;
      expect(firstGroup.sender).toBe(ROLE.AI);
      expect(firstGroup.messages).toEqual(['AI 1', 'AI 2']);

      // User message
      const userChat = result[1] as UserChat;
      expect(userChat.sender).toBe(ROLE.USER);
      expect(userChat.message).toBe('User 1');

      // Second AI group
      const secondGroup = result[2] as AssistantChat;
      expect(secondGroup.sender).toBe(ROLE.AI);
      expect(secondGroup.messages).toEqual(['AI 3', 'AI 4']);
    });
  });

  describe('Edge Cases', () => {
    it('should handle alternating user and AI messages', () => {
      const chats: Chat[] = [
        { sender: ROLE.USER, message: 'User 1', time: '12:00' },
        { sender: ROLE.AI, message: 'AI 1', time: '12:01' },
        { sender: ROLE.USER, message: 'User 2', time: '12:02' },
        { sender: ROLE.AI, message: 'AI 2', time: '12:03' },
      ];

      const result = parseChats(chats);

      expect(result).toHaveLength(4);
      expect((result[0] as UserChat).message).toBe('User 1');
      expect((result[1] as AssistantChat).messages).toEqual(['AI 1']);
      expect((result[2] as UserChat).message).toBe('User 2');
      expect((result[3] as AssistantChat).messages).toEqual(['AI 2']);
    });

    it('should handle multiple consecutive user messages', () => {
      const chats: Chat[] = [
        { sender: ROLE.USER, message: 'User 1', time: '12:00' },
        { sender: ROLE.USER, message: 'User 2', time: '12:01' },
        { sender: ROLE.USER, message: 'User 3', time: '12:02' },
      ];

      const result = parseChats(chats);

      expect(result).toHaveLength(3);
      result.forEach((chat, index) => {
        expect(chat.sender).toBe(ROLE.USER);
        expect((chat as UserChat).message).toBe(`User ${index + 1}`);
      });
    });

    it('should preserve time information for first message in AI group', () => {
      const chats: Chat[] = [
        { sender: ROLE.AI, message: 'First', time: '12:00' },
        { sender: ROLE.AI, message: 'Second', time: '12:01' },
        { sender: ROLE.AI, message: 'Third', time: '12:02' },
      ];

      const result = parseChats(chats);

      expect(result).toHaveLength(1);
      expect(result[0].time).toBe('12:00');
    });

    it('should handle very long AI message sequences', () => {
      const chats: Chat[] = Array.from({ length: 100 }, (_, i) => ({
        sender: ROLE.AI,
        message: `Message ${i}`,
        time: `12:${String(i).padStart(2, '0')}`,
      }));

      const result = parseChats(chats);

      expect(result).toHaveLength(1);
      const assistantChat = result[0] as AssistantChat;
      expect(assistantChat.messages).toHaveLength(100);
      expect(assistantChat.messages[0]).toBe('Message 0');
      expect(assistantChat.messages[99]).toBe('Message 99');
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle realistic conversation flow', () => {
      const chats: Chat[] = [
        { sender: ROLE.AI, message: 'Welcome! How can I help?', time: '12:00' },
        { sender: ROLE.USER, message: "I'm feeling anxious", time: '12:01' },
        { sender: ROLE.AI, message: "I understand", time: '12:02' },
        { sender: ROLE.AI, message: "That's completely normal", time: '12:02' },
        { sender: ROLE.AI, message: 'Take a deep breath', time: '12:02' },
        { sender: ROLE.USER, message: 'Thank you', time: '12:03' },
      ];

      const result = parseChats(chats);

      expect(result).toHaveLength(3);
      
      // First AI message
      expect((result[0] as AssistantChat).messages).toEqual(['Welcome! How can I help?']);
      
      // User message
      expect((result[1] as UserChat).message).toBe("I'm feeling anxious");
      
      // AI message group
      expect((result[2] as AssistantChat).messages).toEqual([
        "I understand",
        "That's completely normal",
        'Take a deep breath',
      ]);
    });

    it('should preserve message integrity with special characters', () => {
      const chats: Chat[] = [
        { sender: ROLE.USER, message: 'Hello! 😊', time: '12:00' },
        { sender: ROLE.AI, message: 'Hi there! 👋', time: '12:01' },
        { sender: ROLE.USER, message: 'Test "quotes" and \'apostrophes\'', time: '12:02' },
      ];

      const result = parseChats(chats);

      expect(result).toHaveLength(3);
      expect((result[0] as UserChat).message).toBe('Hello! 😊');
      expect((result[1] as AssistantChat).messages[0]).toBe('Hi there! 👋');
      expect((result[2] as UserChat).message).toBe('Test "quotes" and \'apostrophes\'');
    });

    it('should handle empty message strings', () => {
      const chats: Chat[] = [
        { sender: ROLE.USER, message: '', time: '12:00' },
        { sender: ROLE.AI, message: '', time: '12:01' },
      ];

      const result = parseChats(chats);

      expect(result).toHaveLength(2);
      expect((result[0] as UserChat).message).toBe('');
      expect((result[1] as AssistantChat).messages).toEqual(['']);
    });
  });

  describe('Type Safety', () => {
    it('should correctly type user chats', () => {
      const chats: Chat[] = [
        { sender: ROLE.USER, message: 'Test', time: '12:00' },
      ];

      const result = parseChats(chats);
      const userChat = result[0];

      expect(userChat.sender).toBe(ROLE.USER);
      if (userChat.sender === ROLE.USER) {
        expect('message' in userChat).toBe(true);
        expect('messages' in userChat).toBe(false);
      }
    });

    it('should correctly type assistant chats', () => {
      const chats: Chat[] = [
        { sender: ROLE.AI, message: 'Test', time: '12:00' },
      ];

      const result = parseChats(chats);
      const assistantChat = result[0];

      expect(assistantChat.sender).toBe(ROLE.AI);
      if (assistantChat.sender === ROLE.AI) {
        expect('messages' in assistantChat).toBe(true);
        expect('message' in assistantChat).toBe(false);
      }
    });
  });
});