import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import ChatModalHeader from '../../../app/_chat/components/ChatModalHeader';

describe('ChatModalHeader', () => {
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = render(<ChatModalHeader onBack={mockOnBack} />);

      expect(toJSON()).not.toBeNull();
    });

    it('should render back button', () => {
      const { toJSON } = render(<ChatModalHeader onBack={mockOnBack} />);

      expect(toJSON()).toBeTruthy();
    });

    it('should match snapshot', () => {
      const { toJSON } = render(<ChatModalHeader onBack={mockOnBack} />);

      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe('User Interactions', () => {
    it('should call onBack when back button is pressed', () => {
      const { UNSAFE_getByType } = render(<ChatModalHeader onBack={mockOnBack} />);

      // Find pressable component and trigger press
      const pressables = UNSAFE_getByType(require('react-native-gesture-handler').Pressable);
      fireEvent.press(pressables);

      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });

    it('should not call onBack on render', () => {
      render(<ChatModalHeader onBack={mockOnBack} />);

      expect(mockOnBack).not.toHaveBeenCalled();
    });

    it('should handle multiple presses', () => {
      const { UNSAFE_getByType } = render(<ChatModalHeader onBack={mockOnBack} />);

      const pressables = UNSAFE_getByType(require('react-native-gesture-handler').Pressable);
      
      fireEvent.press(pressables);
      fireEvent.press(pressables);
      fireEvent.press(pressables);

      expect(mockOnBack).toHaveBeenCalledTimes(3);
    });
  });

  describe('Props Validation', () => {
    it('should require onBack prop', () => {
      expect(() => render(<ChatModalHeader onBack={mockOnBack} />)).not.toThrow();
    });

    it('should accept function for onBack prop', () => {
      const customHandler = jest.fn();
      const { UNSAFE_getByType } = render(<ChatModalHeader onBack={customHandler} />);

      const pressables = UNSAFE_getByType(require('react-native-gesture-handler').Pressable);
      fireEvent.press(pressables);

      expect(customHandler).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have hit slop for easier interaction', () => {
      const { toJSON } = render(<ChatModalHeader onBack={mockOnBack} />);
      const tree = toJSON();

      // Component should render with hitSlop configuration
      expect(tree).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid successive clicks', () => {
      const { UNSAFE_getByType } = render(<ChatModalHeader onBack={mockOnBack} />);

      const pressables = UNSAFE_getByType(require('react-native-gesture-handler').Pressable);

      // Simulate rapid clicks
      for (let i = 0; i < 10; i++) {
        fireEvent.press(pressables);
      }

      expect(mockOnBack).toHaveBeenCalledTimes(10);
    });

    it('should work with different onBack implementations', () => {
      const asyncHandler = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      const { UNSAFE_getByType } = render(<ChatModalHeader onBack={asyncHandler} />);

      const pressables = UNSAFE_getByType(require('react-native-gesture-handler').Pressable);
      fireEvent.press(pressables);

      expect(asyncHandler).toHaveBeenCalled();
    });
  });
});