import { Button, View } from '@src/components/ui';
import { Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';

interface ChatInputBarProps {
  /** 현재 메시지 텍스트 */
  message: string;
  /** 메시지 변경 핸들러 */
  onMessageChange: (text: string) => void;
  /** 포커스 핸들러 */
  onFocus: () => void;
  /** 전송 핸들러 */
  onSend: () => void;
  /** 키보드 높이 (애니메이션용) */
  paddingBottom: SharedValue<number>;
  /** TextInput ref */
  ref: React.RefObject<TextInput | null>;
  /** 채팅 모달 표시 여부 */
  isChatModalVisible: boolean;
  /** 채팅 모달 표시 설정 */
  setIsChatModalVisible: (visible: boolean) => void;
}

export default function ChatInputBar({
  message,
  onMessageChange,
  onFocus,
  onSend,
  ref,
  isChatModalVisible,
  setIsChatModalVisible,
}: ChatInputBarProps) {
  const handlePress = async () => {
    if (isChatModalVisible) return;

    setIsChatModalVisible(!isChatModalVisible);
    await new Promise((resolve) => setTimeout(resolve, 500));
    ref?.current?.focus();
  };

  return (
    <Pressable
      className="flex flex-row items-end justify-center gap-2 pt-4"
      onPress={handlePress}
    >
      <View
        className="flex-1"
        pointerEvents={isChatModalVisible ? 'auto' : 'none'}
      >
        <TextInput
          ref={ref}
          className="mt-0 bg-input rounded-xl border border-solid border-input p-4 font-inter text-lg font-medium leading-5 text-input grow focus:border-input-focus"
          placeholder="Enter your chat"
          placeholderTextColor="var(--input-placeholder)"
          onFocus={onFocus}
          value={message}
          onChangeText={onMessageChange}
        />
      </View>
      <Button
        text="⬆"
        onPress={onSend}
        isLoading={false}
        color="primary"
        size="default"
        fullWidth={false}
        disabled={false}
        className="rounded-xl border border-primary py-3"
      />
    </Pressable>
  );
}
