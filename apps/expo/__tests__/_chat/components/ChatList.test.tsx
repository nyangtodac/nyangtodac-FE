import React from 'react';
import { render } from '@testing-library/react-native';

import ChatList from '../../../app/_chat/components/ChatList';
import { ROLE } from '../../../app/_chat/constants';
import type { Chat } from '../../../app/_chat/types';

// Mock the parseChats utility
jest.mock('../../../app/_chat/utils/parseChats', () => ({
  parseChats: jest.fn((chats) => chats),
}));

describe('ChatList', () => {
  const mockChats: Chat[] = [
    { sender: ROLE.USER, message: 'User message 1', time: '12:00' },
    { sender: ROLE.AI, message: 'AI message 1', time: '12:01' },
    { sender: ROLE.USER, message: 'User message 2', time: '12:02' },
  ];

  const mockRef = { current: null };

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = render(<ChatList ref={mockRef} chats={mockChats} />);

      expect(toJSON()).not.toBeNull();
    });

    it('should render FlatList component', () => {
      const { UNSAFE_getByType } = render(<ChatList ref={mockRef} chats={mockChats} />);

      const FlatList = require('react-native-gesture-handler').FlatList;
      expect(UNSAFE_getByType(FlatList)).toBeTruthy();
    });

    it('should match snapshot', () => {
      const { toJSON } = render(<ChatList ref={mockRef} chats={mockChats} />);

      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('Empty State', () => {
    it('should render with empty chats array', () => {
      const { toJSON } = render(<ChatList ref={mockRef} chats={[]} />);

      expect(toJSON()).not.toBeNull();
    });

    it('should handle empty chats gracefully', () => {
      expect(() => render(<ChatList ref={mockRef} chats={[]} />)).not.toThrow();
    });
  });

  describe('Chat Parsing', () => {
    it('should call parseChats with provided chats', () => {
      const { parseChats } = require('../../../app/_chat/utils/parseChats');

      render(<ChatList ref={mockRef} chats={mockChats} />);

      expect(parseChats).toHaveBeenCalledWith(mockChats);
    });

    it('should memoize parsed chats', () => {
      const { parseChats } = require('../../../app/_chat/utils/parseChats');
      parseChats.mockClear();

      const { rerender } = render(<ChatList ref={mockRef} chats={mockChats} />);

      expect(parseChats).toHaveBeenCalledTimes(1);

      // Rerender with same chats
      rerender(<ChatList ref={mockRef} chats={mockChats} />);

      // Should still be called only once due to useMemo
      expect(parseChats).toHaveBeenCalledTimes(1);
    });

    it('should reparse when chats change', () => {
      const { parseChats } = require('../../../app/_chat/utils/parseChats');
      parseChats.mockClear();

      const { rerender } = render(<ChatList ref={mockRef} chats={mockChats} />);

      const newChats = [
        ...mockChats,
        { sender: ROLE.AI, message: 'New message', time: '12:03' },
      ];

      rerender(<ChatList ref={mockRef} chats={newChats} />);

      expect(parseChats).toHaveBeenCalledTimes(2);
      expect(parseChats).toHaveBeenLastCalledWith(newChats);
    });
  });

  describe('FlatList Configuration', () => {
    it('should configure FlatList as inverted', () => {
      const { UNSAFE_getByType } = render(<ChatList ref={mockRef} chats={mockChats} />);

      const FlatList = require('react-native-gesture-handler').FlatList;
      const flatList = UNSAFE_getByType(FlatList);

      expect(flatList.props.inverted).toBe(true);
    });

    it('should have correct content container style', () => {
      const { UNSAFE_getByType } = render(<ChatList ref={mockRef} chats={mockChats} />);

      const FlatList = require('react-native-gesture-handler').FlatList;
      const flatList = UNSAFE_getByType(FlatList);

      expect(flatList.props.contentContainerStyle).toMatchObject({
        flexGrow: 1,
        justifyContent: 'flex-start',
        gap: 16,
      });
    });

    it('should disable scroll indicators', () => {
      const { UNSAFE_getByType } = render(<ChatList ref={mockRef} chats={mockChats} />);

      const FlatList = require('react-native-gesture-handler').FlatList;
      const flatList = UNSAFE_getByType(FlatList);

      expect(flatList.props.showsVerticalScrollIndicator).toBe(false);
    });

    it('should disable bouncing', () => {
      const { UNSAFE_getByType } = render(<ChatList ref={mockRef} chats={mockChats} />);

      const FlatList = require('react-native-gesture-handler').FlatList;
      const flatList = UNSAFE_getByType(FlatList);

      expect(flatList.props.bounces).toBe(false);
      expect(flatList.props.overScrollMode).toBe('never');
    });
  });

  describe('Props Validation', () => {
    it('should accept ref prop', () => {
      const customRef = { current: null };

      expect(() => render(<ChatList ref={customRef} chats={mockChats} />)).not.toThrow();
    });

    it('should accept chats array', () => {
      expect(() => render(<ChatList ref={mockRef} chats={mockChats} />)).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle large number of chats', () => {
      const largeChats: Chat[] = Array.from({ length: 1000 }, (_, i) => ({
        sender: i % 2 === 0 ? ROLE.USER : ROLE.AI,
        message: `Message ${i}`,
        time: `12:${String(i % 60).padStart(2, '0')}`,
      }));

      expect(() => render(<ChatList ref={mockRef} chats={largeChats} />)).not.toThrow();
    });

    it('should handle chats with long messages', () => {
      const longMessageChats: Chat[] = [
        {
          sender: ROLE.USER,
          message: 'A'.repeat(10000),
          time: '12:00',
        },
      ];

      expect(() => render(<ChatList ref={mockRef} chats={longMessageChats} />)).not.toThrow();
    });

    it('should handle rapid chat updates', () => {
      const { rerender } = render(<ChatList ref={mockRef} chats={mockChats} />);

      for (let i = 0; i < 10; i++) {
        const newChats = [
          ...mockChats,
          { sender: ROLE.USER, message: `Update ${i}`, time: `12:${i}` },
        ];
        rerender(<ChatList ref={mockRef} chats={newChats} />);
      }

      // Should not crash
      expect(true).toBe(true);
    });
  });

  describe('Key Extraction', () => {
    it('should provide keyExtractor function', () => {
      const { UNSAFE_getByType } = render(<ChatList ref={mockRef} chats={mockChats} />);

      const FlatList = require('react-native-gesture-handler').FlatList;
      const flatList = UNSAFE_getByType(FlatList);

      expect(typeof flatList.props.keyExtractor).toBe('function');
    });

    it('should extract keys based on index', () => {
      const { UNSAFE_getByType } = render(<ChatList ref={mockRef} chats={mockChats} />);

      const FlatList = require('react-native-gesture-handler').FlatList;
      const flatList = UNSAFE_getByType(FlatList);

      const key = flatList.props.keyExtractor({}, 5);
      expect(key).toBe('5');
    });
  });
});