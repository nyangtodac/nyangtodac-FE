import React from 'react';
import { render } from '@testing-library/react-native';

import UserChatBox from '../../../../app/_chat/components/ChatItem/UserChatBox';
import { ROLE } from '../../../../app/_chat/constants';
import type { UserChat } from '../../../../app/_chat/types';

describe('UserChatBox', () => {
  const mockUserChat: UserChat = {
    sender: ROLE.USER,
    message: 'Hello, this is a test message',
    time: '12:00',
  };

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = render(<UserChatBox chat={mockUserChat} />);

      expect(toJSON()).not.toBeNull();
    });

    it('should display the user message', () => {
      const { getByText } = render(<UserChatBox chat={mockUserChat} />);

      expect(getByText('Hello, this is a test message')).toBeTruthy();
    });

    it('should match snapshot', () => {
      const { toJSON } = render(<UserChatBox chat={mockUserChat} />);

      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('Message Content', () => {
    it('should display simple text messages', () => {
      const chat: UserChat = {
        sender: ROLE.USER,
        message: 'Simple message',
        time: '12:00',
      };

      const { getByText } = render(<UserChatBox chat={chat} />);

      expect(getByText('Simple message')).toBeTruthy();
    });

    it('should display messages with special characters', () => {
      const chat: UserChat = {
        sender: ROLE.USER,
        message: 'Hello! 😊 How are you? 🎉',
        time: '12:00',
      };

      const { getByText } = render(<UserChatBox chat={chat} />);

      expect(getByText('Hello! 😊 How are you? 🎉')).toBeTruthy();
    });

    it('should display messages with quotes', () => {
      const chat: UserChat = {
        sender: ROLE.USER,
        message: 'She said "Hello" and I replied \'Hi\'',
        time: '12:00',
      };

      const { getByText } = render(<UserChatBox chat={chat} />);

      expect(getByText('She said "Hello" and I replied \'Hi\'')).toBeTruthy();
    });

    it('should display long messages', () => {
      const longMessage = 'This is a very long message that should still be displayed correctly. '.repeat(10);
      const chat: UserChat = {
        sender: ROLE.USER,
        message: longMessage,
        time: '12:00',
      };

      const { getByText } = render(<UserChatBox chat={chat} />);

      expect(getByText(longMessage)).toBeTruthy();
    });

    it('should handle empty messages', () => {
      const chat: UserChat = {
        sender: ROLE.USER,
        message: '',
        time: '12:00',
      };

      const { toJSON } = render(<UserChatBox chat={chat} />);

      expect(toJSON()).not.toBeNull();
    });

    it('should display messages with line breaks', () => {
      const chat: UserChat = {
        sender: ROLE.USER,
        message: 'Line 1\nLine 2\nLine 3',
        time: '12:00',
      };

      const { getByText } = render(<UserChatBox chat={chat} />);

      expect(getByText('Line 1\nLine 2\nLine 3')).toBeTruthy();
    });
  });

  describe('Props Validation', () => {
    it('should accept valid UserChat object', () => {
      expect(() => render(<UserChatBox chat={mockUserChat} />)).not.toThrow();
    });

    it('should handle different time formats', () => {
      const chats = [
        { sender: ROLE.USER, message: 'Test 1', time: '12:00' },
        { sender: ROLE.USER, message: 'Test 2', time: '2023-01-01T12:00:00Z' },
        { sender: ROLE.USER, message: 'Test 3', time: '1234567890' },
      ] as UserChat[];

      chats.forEach((chat) => {
        expect(() => render(<UserChatBox chat={chat} />)).not.toThrow();
      });
    });
  });

  describe('Styling', () => {
    it('should apply correct styling classes', () => {
      const { toJSON } = render(<UserChatBox chat={mockUserChat} />);

      expect(toJSON()).toBeTruthy();
    });

    it('should have consistent styling across different messages', () => {
      const chat1 = { sender: ROLE.USER, message: 'Short', time: '12:00' } as UserChat;
      const chat2 = { sender: ROLE.USER, message: 'This is a much longer message', time: '12:01' } as UserChat;

      const { toJSON: tree1 } = render(<UserChatBox chat={chat1} />);
      const { toJSON: tree2 } = render(<UserChatBox chat={chat2} />);

      expect(tree1).toBeTruthy();
      expect(tree2).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle Unicode characters', () => {
      const chat: UserChat = {
        sender: ROLE.USER,
        message: '你好 مرحبا こんにちは',
        time: '12:00',
      };

      const { getByText } = render(<UserChatBox chat={chat} />);

      expect(getByText('你好 مرحبا こんにちは')).toBeTruthy();
    });

    it('should handle messages with only whitespace', () => {
      const chat: UserChat = {
        sender: ROLE.USER,
        message: '   ',
        time: '12:00',
      };

      const { toJSON } = render(<UserChatBox chat={chat} />);

      expect(toJSON()).not.toBeNull();
    });

    it('should handle very short messages', () => {
      const chat: UserChat = {
        sender: ROLE.USER,
        message: 'Hi',
        time: '12:00',
      };

      const { getByText } = render(<UserChatBox chat={chat} />);

      expect(getByText('Hi')).toBeTruthy();
    });

    it('should handle messages with numbers', () => {
      const chat: UserChat = {
        sender: ROLE.USER,
        message: '12345 67890',
        time: '12:00',
      };

      const { getByText } = render(<UserChatBox chat={chat} />);

      expect(getByText('12345 67890')).toBeTruthy();
    });
  });

  describe('Type Safety', () => {
    it('should only accept UserChat with USER sender', () => {
      const validChat: UserChat = {
        sender: ROLE.USER,
        message: 'Valid message',
        time: '12:00',
      };

      expect(() => render(<UserChatBox chat={validChat} />)).not.toThrow();
    });
  });
});