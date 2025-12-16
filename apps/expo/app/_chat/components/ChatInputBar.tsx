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
      className="flex flex-row items-center 
      justify-center gap-2 mt-4 border-input 
      border-neutral-700
      border-solid border rounded-2xl
      focus:border-neutral-600 py-1"
      style={{ backgroundColor: 'rgba(65, 65, 65, 0.9)' }}
      onPress={handlePress}
    >
      <Button
        text="⬆"
        onPress={() => console.log('추천')}
        isLoading={false}
        color="link"
        size="default"
        fullWidth={false}
        disabled={false}
        className="py-2 bg-neutral-800 rounded-3xl"
      />
      <View
        className="flex-1 justify-center"
        pointerEvents={isChatModalVisible ? 'auto' : 'none'}
      >
        <TextInput
          ref={ref}
          className="bg-chat-input rounded-xl px-2 text-white grow focus:border-input-focus"
          style={{ fontSize: 16 }}
          placeholder="메시지를 입력해주세요"
          placeholderTextColor="rgba(255, 255, 255, 0.50)"
          onFocus={onFocus}
          value={message}
          onChangeText={onMessageChange}
          textAlignVertical="center"
        />
      </View>
      <Button
        text="⬆"
        onPress={onSend}
        isLoading={false}
        color="link"
        size="default"
        fullWidth={false}
        disabled={false}
        className="py-3"
      />
    </Pressable>
  );
}
