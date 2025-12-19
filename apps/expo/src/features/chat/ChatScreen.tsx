import { Pressable } from '@src/components/ui';
import Animated from 'react-native-reanimated';

import {
  ChatInputBar,
  ChatList,
  ChatModalHeader,
  ChatOverlay,
} from './components';
import { useChat, useChatKeyboard } from './hooks';

export default function ChatScreen() {
  const { input, list, modal, handlers } = useChat();
  const { inputAnimatedStyle } = useChatKeyboard();

  return (
    <>
      <ChatOverlay visible={modal.isChatModalVisible} />

      <Pressable
        className="flex flex-1 flex-col justify-end w-full"
        onPress={() => input.inputRef.current?.blur()}
      >
        {modal.isChatModalVisible && (
          <ChatModalHeader onBack={handlers.handleBack} />
        )}

        <Animated.View
          className="flex flex-1 flex-col justify-end px-4"
          style={[inputAnimatedStyle]}
        >
          {modal.isChatModalVisible && (
            <ChatList
              ref={list.flatListRef}
              chats={list.chats}
              isChatLoading={list.isChatLoading}
            />
          )}
          <ChatInputBar
            ref={input.inputRef}
            message={input.message}
            onMessageChange={input.setMessage}
            onFocus={handlers.handleInputFocus}
            onSend={handlers.handleSend}
            isChatModalVisible={modal.isChatModalVisible}
            setIsChatModalVisible={modal.setIsChatModalVisible}
          />
        </Animated.View>
      </Pressable>
    </>
  );
}
