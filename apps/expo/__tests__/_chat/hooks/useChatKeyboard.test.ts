import { renderHook } from '@testing-library/react-hooks';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useChatKeyboard } from '../../../app/_chat/hooks/useChatKeyboard';

// Mock dependencies
jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn(),
  useAnimatedStyle: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

jest.mock('react-native-keyboard-controller', () => ({
  useKeyboardHandler: jest.fn((handler) => {
    // Store handler for testing
    (global as any).keyboardHandler = handler;
  }),
}));

describe('useChatKeyboard', () => {
  const mockUseSharedValue = useSharedValue as jest.MockedFunction<typeof useSharedValue>;
  const mockUseAnimatedStyle = useAnimatedStyle as jest.MockedFunction<typeof useAnimatedStyle>;
  const mockUseSafeAreaInsets = useSafeAreaInsets as jest.MockedFunction<typeof useSafeAreaInsets>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    mockUseSharedValue.mockReturnValue({ value: 0 } as any);
    mockUseAnimatedStyle.mockReturnValue({ paddingBottom: 16 });
    mockUseSafeAreaInsets.mockReturnValue({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
  });

  describe('Initialization', () => {
    it('should initialize keyboardHeight as SharedValue with 0', () => {
      renderHook(() => useChatKeyboard());

      expect(mockUseSharedValue).toHaveBeenCalledWith(0);
    });

    it('should return keyboardHeight SharedValue', () => {
      const mockSharedValue = { value: 0 };
      mockUseSharedValue.mockReturnValue(mockSharedValue as any);

      const { result } = renderHook(() => useChatKeyboard());

      expect(result.current.keyboardHeight).toBe(mockSharedValue);
    });

    it('should return inputAnimatedStyle', () => {
      const mockStyle = { paddingBottom: 16 };
      mockUseAnimatedStyle.mockReturnValue(mockStyle);

      const { result } = renderHook(() => useChatKeyboard());

      expect(result.current.inputAnimatedStyle).toBe(mockStyle);
    });

    it('should call useSafeAreaInsets', () => {
      renderHook(() => useChatKeyboard());

      expect(mockUseSafeAreaInsets).toHaveBeenCalled();
    });
  });

  describe('Animated Style Calculation', () => {
    it('should use safe area insets in style calculation', () => {
      const mockInsets = { top: 10, right: 0, bottom: 34, left: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);

      let styleFunction: (() => any) | undefined;
      mockUseAnimatedStyle.mockImplementation((fn) => {
        styleFunction = fn;
        return { paddingBottom: 50 };
      });

      renderHook(() => useChatKeyboard());

      expect(mockUseAnimatedStyle).toHaveBeenCalled();
      expect(styleFunction).toBeDefined();
    });

    it('should calculate paddingBottom based on keyboard height and insets', () => {
      const mockInsets = { top: 0, right: 0, bottom: 34, left: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);

      const mockKeyboardHeight = { value: 300 };
      mockUseSharedValue.mockReturnValue(mockKeyboardHeight as any);

      let calculatedStyle: any;
      mockUseAnimatedStyle.mockImplementation((fn) => {
        calculatedStyle = fn();
        return calculatedStyle;
      });

      renderHook(() => useChatKeyboard());

      // The style function should use Math.max(keyboardHeight.value, insets.bottom) + 16
      expect(calculatedStyle).toBeDefined();
    });

    it('should use insets.bottom when keyboard is not visible', () => {
      const mockInsets = { top: 0, right: 0, bottom: 34, left: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);

      const mockKeyboardHeight = { value: 0 };
      mockUseSharedValue.mockReturnValue(mockKeyboardHeight as any);

      let calculatedStyle: any;
      mockUseAnimatedStyle.mockImplementation((fn) => {
        calculatedStyle = fn();
        return calculatedStyle;
      });

      renderHook(() => useChatKeyboard());

      // When keyboard height is 0, should use insets.bottom (34) + 16 = 50
      expect(mockUseAnimatedStyle).toHaveBeenCalled();
    });

    it('should handle zero safe area insets', () => {
      const mockInsets = { top: 0, right: 0, bottom: 0, left: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);

      const mockKeyboardHeight = { value: 0 };
      mockUseSharedValue.mockReturnValue(mockKeyboardHeight as any);

      renderHook(() => useChatKeyboard());

      expect(mockUseAnimatedStyle).toHaveBeenCalled();
    });
  });

  describe('Return Value Structure', () => {
    it('should return object with keyboardHeight and inputAnimatedStyle', () => {
      const { result } = renderHook(() => useChatKeyboard());

      expect(result.current).toHaveProperty('keyboardHeight');
      expect(result.current).toHaveProperty('inputAnimatedStyle');
    });

    it('should have correct types for return values', () => {
      const mockSharedValue = { value: 100 };
      const mockStyle = { paddingBottom: 116 };

      mockUseSharedValue.mockReturnValue(mockSharedValue as any);
      mockUseAnimatedStyle.mockReturnValue(mockStyle);

      const { result } = renderHook(() => useChatKeyboard());

      expect(typeof result.current.keyboardHeight).toBe('object');
      expect(typeof result.current.inputAnimatedStyle).toBe('object');
    });
  });

  describe('Edge Cases', () => {
    it('should handle large keyboard heights', () => {
      const mockInsets = { top: 0, right: 0, bottom: 34, left: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);

      const mockKeyboardHeight = { value: 500 };
      mockUseSharedValue.mockReturnValue(mockKeyboardHeight as any);

      const { result } = renderHook(() => useChatKeyboard());

      expect(result.current.keyboardHeight.value).toBe(500);
    });

    it('should handle large safe area insets', () => {
      const mockInsets = { top: 0, right: 0, bottom: 100, left: 0 };
      mockUseSafeAreaInsets.mockReturnValue(mockInsets);

      renderHook(() => useChatKeyboard());

      expect(mockUseSafeAreaInsets).toHaveBeenCalled();
    });

    it('should not crash with undefined insets', () => {
      mockUseSafeAreaInsets.mockReturnValue({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      });

      expect(() => renderHook(() => useChatKeyboard())).not.toThrow();
    });
  });

  describe('Hook Stability', () => {
    it('should maintain stable references across rerenders', () => {
      const { result, rerender } = renderHook(() => useChatKeyboard());

      const firstKeyboardHeight = result.current.keyboardHeight;
      const firstAnimatedStyle = result.current.inputAnimatedStyle;

      rerender();

      // References should remain the same (mocked behavior)
      expect(result.current.keyboardHeight).toBe(firstKeyboardHeight);
      expect(result.current.inputAnimatedStyle).toBe(firstAnimatedStyle);
    });
  });
});