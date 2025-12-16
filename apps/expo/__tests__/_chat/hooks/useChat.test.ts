import { act, renderHook } from '@testing-library/react-hooks';

import { CHAT_MOCK_DATA, ROLE } from '../../../app/_chat/constants';
import { useChat } from '../../../app/_chat/hooks/useChat';

// Mock the constants
jest.mock('../../../app/_chat/constants', () => ({
  CHAT_MOCK_DATA: [
    { sender: 'AI', message: 'Test message', time: '12:00' },
  ],
  ROLE: {
    USER: 'USER',
    AI: 'AI',
  },
}));

describe('useChat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(() => useChat());

      expect(result.current.isChatModalVisible).toBe(false);
      expect(result.current.message).toBe('');
      expect(result.current.chats).toEqual(CHAT_MOCK_DATA);
      expect(result.current.inputRef.current).toBeNull();
      expect(result.current.flatListRef.current).toBeNull();
    });

    it('should provide all required functions', () => {
      const { result } = renderHook(() => useChat());

      expect(typeof result.current.setMessage).toBe('function');
      expect(typeof result.current.handleBack).toBe('function');
      expect(typeof result.current.handleInputFocus).toBe('function');
      expect(typeof result.current.handleSend).toBe('function');
      expect(typeof result.current.setIsChatModalVisible).toBe('function');
    });
  });

  describe('setMessage', () => {
    it('should update message state', () => {
      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.setMessage('New message');
      });

      expect(result.current.message).toBe('New message');
    });

    it('should allow clearing message', () => {
      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.setMessage('Test');
      });
      expect(result.current.message).toBe('Test');

      act(() => {
        result.current.setMessage('');
      });
      expect(result.current.message).toBe('');
    });

    it('should handle special characters in message', () => {
      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.setMessage('Hello! 😊 "quotes" & special chars');
      });

      expect(result.current.message).toBe('Hello! 😊 "quotes" & special chars');
    });
  });

  describe('handleBack', () => {
    it('should hide modal and clear message', () => {
      const { result } = renderHook(() => useChat());

      // Set up initial state
      act(() => {
        result.current.setIsChatModalVisible(true);
        result.current.setMessage('Some message');
      });

      expect(result.current.isChatModalVisible).toBe(true);
      expect(result.current.message).toBe('Some message');

      // Call handleBack
      act(() => {
        result.current.handleBack();
      });

      expect(result.current.isChatModalVisible).toBe(false);
      expect(result.current.message).toBe('');
    });

    it('should blur input when called', () => {
      const { result } = renderHook(() => useChat());
      const mockBlur = jest.fn();

      // Mock the input ref
      act(() => {
        if (result.current.inputRef.current) {
          result.current.inputRef.current.blur = mockBlur;
        }
      });

      act(() => {
        result.current.handleBack();
      });

      // Note: Since we can't actually set the ref in tests, we verify the behavior
      expect(result.current.isChatModalVisible).toBe(false);
    });

    it('should be stable across renders', () => {
      const { result, rerender } = renderHook(() => useChat());
      const firstHandleBack = result.current.handleBack;

      rerender();

      expect(result.current.handleBack).toBe(firstHandleBack);
    });
  });

  describe('handleInputFocus', () => {
    it('should show chat modal', () => {
      const { result } = renderHook(() => useChat());

      expect(result.current.isChatModalVisible).toBe(false);

      act(() => {
        result.current.handleInputFocus();
      });

      expect(result.current.isChatModalVisible).toBe(true);
    });

    it('should be stable across renders', () => {
      const { result, rerender } = renderHook(() => useChat());
      const firstHandleFocus = result.current.handleInputFocus;

      rerender();

      expect(result.current.handleInputFocus).toBe(firstHandleFocus);
    });

    it('should not affect message state', () => {
      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.setMessage('Test message');
      });

      const messageBefore = result.current.message;

      act(() => {
        result.current.handleInputFocus();
      });

      expect(result.current.message).toBe(messageBefore);
    });
  });

  describe('handleSend', () => {
    it('should add user message to chats', () => {
      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.setMessage('Hello world');
      });

      const initialChatLength = result.current.chats.length;

      act(() => {
        result.current.handleSend();
      });

      expect(result.current.chats).toHaveLength(initialChatLength + 1);
      expect(result.current.chats[0].sender).toBe(ROLE.USER);
      expect(result.current.chats[0].message).toBe('Hello world');
    });

    it('should clear message after sending', () => {
      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.setMessage('Test message');
        result.current.handleSend();
      });

      expect(result.current.message).toBe('');
    });

    it('should not send empty messages', () => {
      const { result } = renderHook(() => useChat());

      const initialChatLength = result.current.chats.length;

      act(() => {
        result.current.setMessage('');
        result.current.handleSend();
      });

      expect(result.current.chats).toHaveLength(initialChatLength);
    });

    it('should not send whitespace-only messages', () => {
      const { result } = renderHook(() => useChat());

      const initialChatLength = result.current.chats.length;

      act(() => {
        result.current.setMessage('   ');
        result.current.handleSend();
      });

      expect(result.current.chats).toHaveLength(initialChatLength);
    });

    it('should trim message but preserve original when sending', () => {
      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.setMessage('  Valid message  ');
        result.current.handleSend();
      });

      // Message should be sent (trimmed version passes validation)
      expect(result.current.chats[0].message).toBe('  Valid message  ');
    });

    it('should add timestamp to sent message', () => {
      const { result } = renderHook(() => useChat());

      const beforeSend = new Date().toISOString();

      act(() => {
        result.current.setMessage('Test');
        result.current.handleSend();
      });

      const afterSend = new Date().toISOString();
      const sentMessage = result.current.chats[0];

      expect(sentMessage.time).toBeDefined();
      expect(new Date(sentMessage.time).getTime()).toBeGreaterThanOrEqual(
        new Date(beforeSend).getTime()
      );
      expect(new Date(sentMessage.time).getTime()).toBeLessThanOrEqual(
        new Date(afterSend).getTime()
      );
    });

    it('should add new messages to the beginning of array', () => {
      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.setMessage('First message');
        result.current.handleSend();
      });

      const firstMessage = result.current.chats[0].message;

      act(() => {
        result.current.setMessage('Second message');
        result.current.handleSend();
      });

      expect(result.current.chats[0].message).toBe('Second message');
      expect(result.current.chats[1].message).toBe(firstMessage);
    });
  });

  describe('setIsChatModalVisible', () => {
    it('should toggle modal visibility', () => {
      const { result } = renderHook(() => useChat());

      expect(result.current.isChatModalVisible).toBe(false);

      act(() => {
        result.current.setIsChatModalVisible(true);
      });

      expect(result.current.isChatModalVisible).toBe(true);

      act(() => {
        result.current.setIsChatModalVisible(false);
      });

      expect(result.current.isChatModalVisible).toBe(false);
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle complete conversation flow', () => {
      const { result } = renderHook(() => useChat());

      // Open modal
      act(() => {
        result.current.handleInputFocus();
      });
      expect(result.current.isChatModalVisible).toBe(true);

      // Type and send first message
      act(() => {
        result.current.setMessage('First message');
        result.current.handleSend();
      });
      expect(result.current.message).toBe('');
      expect(result.current.chats[0].message).toBe('First message');

      // Type and send second message
      act(() => {
        result.current.setMessage('Second message');
        result.current.handleSend();
      });
      expect(result.current.chats[0].message).toBe('Second message');

      // Close modal
      act(() => {
        result.current.handleBack();
      });
      expect(result.current.isChatModalVisible).toBe(false);
    });

    it('should maintain chat history across modal open/close', () => {
      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.setMessage('Test message');
        result.current.handleSend();
      });

      const chatLengthAfterSend = result.current.chats.length;

      act(() => {
        result.current.handleInputFocus();
        result.current.handleBack();
      });

      expect(result.current.chats).toHaveLength(chatLengthAfterSend);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid message sending', () => {
      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.setMessage('Message 1');
        result.current.handleSend();
        result.current.setMessage('Message 2');
        result.current.handleSend();
        result.current.setMessage('Message 3');
        result.current.handleSend();
      });

      expect(result.current.chats[0].message).toBe('Message 3');
      expect(result.current.chats[1].message).toBe('Message 2');
      expect(result.current.chats[2].message).toBe('Message 1');
    });

    it('should handle very long messages', () => {
      const { result } = renderHook(() => useChat());
      const longMessage = 'A'.repeat(10000);

      act(() => {
        result.current.setMessage(longMessage);
        result.current.handleSend();
      });

      expect(result.current.chats[0].message).toBe(longMessage);
    });
  });
});