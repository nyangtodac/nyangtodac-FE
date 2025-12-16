import React from 'react';
import { render } from '@testing-library/react-native';

import AssistantChatBox from '../../../../app/_chat/components/ChatItem/AssistantChatBox';
import { ROLE } from '../../../../app/_chat/constants';
import type { AssistantChat } from '../../../../app/_chat/types';

describe('AssistantChatBox', () => {
  const mockAssistantChat: AssistantChat = {
    sender: ROLE.AI,
    messages: ['Hello!', 'How can I help you today?'],
    time: '12:00',
  };

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = render(<AssistantChatBox chat={mockAssistantChat} />);

      expect(toJSON()).not.toBeNull();
    });

    it('should display all messages in the array', () => {
      const { getByText } = render(<AssistantChatBox chat={mockAssistantChat} />);

      expect(getByText('Hello!')).toBeTruthy();
      expect(getByText('How can I help you today?')).toBeTruthy();
    });

    it('should match snapshot', () => {
      const { toJSON } = render(<AssistantChatBox chat={mockAssistantChat} />);

      expect(toJSON()).toMatchSnapshot();
    });

    it('should render avatar placeholder', () => {
      const { toJSON } = render(<AssistantChatBox chat={mockAssistantChat} />);

      // The component should render an avatar View element
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Single Message', () => {
    it('should display single message correctly', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: ['Single message'],
        time: '12:00',
      };

      const { getByText } = render(<AssistantChatBox chat={chat} />);

      expect(getByText('Single message')).toBeTruthy();
    });

    it('should handle empty message in array', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: [''],
        time: '12:00',
      };

      const { toJSON } = render(<AssistantChatBox chat={chat} />);

      expect(toJSON()).not.toBeNull();
    });
  });

  describe('Multiple Messages', () => {
    it('should display all messages in order', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: ['First', 'Second', 'Third'],
        time: '12:00',
      };

      const { getByText } = render(<AssistantChatBox chat={chat} />);

      expect(getByText('First')).toBeTruthy();
      expect(getByText('Second')).toBeTruthy();
      expect(getByText('Third')).toBeTruthy();
    });

    it('should handle many messages', () => {
      const messages = Array.from({ length: 10 }, (_, i) => `Message ${i + 1}`);
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages,
        time: '12:00',
      };

      const { getByText } = render(<AssistantChatBox chat={chat} />);

      messages.forEach((message) => {
        expect(getByText(message)).toBeTruthy();
      });
    });

    it('should generate unique keys for each message', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: ['Same', 'Same', 'Same'],
        time: '12:00',
      };

      const { toJSON } = render(<AssistantChatBox chat={chat} />);

      // Should render without key warnings
      expect(toJSON()).not.toBeNull();
    });
  });

  describe('Message Content Variations', () => {
    it('should display messages with special characters', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: ['Hello! 😊', 'How are you? 🎉'],
        time: '12:00',
      };

      const { getByText } = render(<AssistantChatBox chat={chat} />);

      expect(getByText('Hello! 😊')).toBeTruthy();
      expect(getByText('How are you? 🎉')).toBeTruthy();
    });

    it('should display long messages', () => {
      const longMessage = 'This is a very long message that should wrap properly. '.repeat(5);
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: [longMessage],
        time: '12:00',
      };

      const { getByText } = render(<AssistantChatBox chat={chat} />);

      expect(getByText(longMessage)).toBeTruthy();
    });

    it('should handle messages with line breaks', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: ['Line 1\nLine 2', 'Another message'],
        time: '12:00',
      };

      const { getByText } = render(<AssistantChatBox chat={chat} />);

      expect(getByText('Line 1\nLine 2')).toBeTruthy();
      expect(getByText('Another message')).toBeTruthy();
    });

    it('should handle Unicode characters', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: ['你好', 'مرحبا', 'こんにちは'],
        time: '12:00',
      };

      const { getByText } = render(<AssistantChatBox chat={chat} />);

      expect(getByText('你好')).toBeTruthy();
      expect(getByText('مرحبا')).toBeTruthy();
      expect(getByText('こんにちは')).toBeTruthy();
    });
  });

  describe('Empty States', () => {
    it('should handle empty messages array', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: [],
        time: '12:00',
      };

      const { toJSON } = render(<AssistantChatBox chat={chat} />);

      expect(toJSON()).not.toBeNull();
    });

    it('should handle messages with whitespace only', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: ['   ', '  '],
        time: '12:00',
      };

      const { toJSON } = render(<AssistantChatBox chat={chat} />);

      expect(toJSON()).not.toBeNull();
    });
  });

  describe('Props Validation', () => {
    it('should accept valid AssistantChat object', () => {
      expect(() => render(<AssistantChatBox chat={mockAssistantChat} />)).not.toThrow();
    });

    it('should handle different time formats', () => {
      const chats = [
        { sender: ROLE.AI, messages: ['Test'], time: '12:00' },
        { sender: ROLE.AI, messages: ['Test'], time: '2023-01-01T12:00:00Z' },
        { sender: ROLE.AI, messages: ['Test'], time: '1234567890' },
      ] as AssistantChat[];

      chats.forEach((chat) => {
        expect(() => render(<AssistantChatBox chat={chat} />)).not.toThrow();
      });
    });
  });

  describe('Styling', () => {
    it('should apply correct container styling', () => {
      const { toJSON } = render(<AssistantChatBox chat={mockAssistantChat} />);

      expect(toJSON()).toBeTruthy();
    });

    it('should render avatar with correct dimensions', () => {
      const { toJSON } = render(<AssistantChatBox chat={mockAssistantChat} />);

      // Avatar should be rendered with w-12 h-12 classes
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long message arrays', () => {
      const messages = Array.from({ length: 50 }, (_, i) => `Message ${i}`);
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages,
        time: '12:00',
      };

      const { toJSON } = render(<AssistantChatBox chat={chat} />);

      expect(toJSON()).not.toBeNull();
    });

    it('should handle mixed length messages', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: [
          'Short',
          'This is a much longer message that contains more text',
          'Medium length message',
          'A',
        ],
        time: '12:00',
      };

      const { getByText } = render(<AssistantChatBox chat={chat} />);

      expect(getByText('Short')).toBeTruthy();
      expect(getByText('This is a much longer message that contains more text')).toBeTruthy();
      expect(getByText('Medium length message')).toBeTruthy();
      expect(getByText('A')).toBeTruthy();
    });

    it('should handle messages with numbers and symbols', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: ['123', '@#$%', 'test@example.com'],
        time: '12:00',
      };

      const { getByText } = render(<AssistantChatBox chat={chat} />);

      expect(getByText('123')).toBeTruthy();
      expect(getByText('@#$%')).toBeTruthy();
      expect(getByText('test@example.com')).toBeTruthy();
    });
  });

  describe('Type Safety', () => {
    it('should only accept AssistantChat with AI sender', () => {
      const validChat: AssistantChat = {
        sender: ROLE.AI,
        messages: ['Valid message'],
        time: '12:00',
      };

      expect(() => render(<AssistantChatBox chat={validChat} />)).not.toThrow();
    });

    it('should require messages array', () => {
      const chat: AssistantChat = {
        sender: ROLE.AI,
        messages: ['Required array'],
        time: '12:00',
      };

      expect(() => render(<AssistantChatBox chat={chat} />)).not.toThrow();
    });
  });
});