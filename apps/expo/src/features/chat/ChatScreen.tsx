import { Pressable, View } from '@src/components/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatModalHeader, ChatOverlay } from './components';
import ChatContainer from './components/ChatContainer/ChatContainer';
import { ChatModalProvider } from './context';
import { useChat } from './hooks';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1"
      style={{ paddingTop: insets.top }}
    >
      <ChatModalProvider>
        <ChatContent />
      </ChatModalProvider>
    </View>
  );
}

function ChatContent() {
  const { input, list, handlers } = useChat();

  return (
    <>
      <ChatOverlay />

      <Pressable
        className="flex flex-1 flex-col justify-end w-full"
        onPress={() => input.inputRef.current?.blur()}
      >
        <ChatModalHeader onBack={handlers.handleBack} />

        <ChatContainer
          list={list}
          input={input}
          handlers={handlers}
        />
      </Pressable>
    </>
  );
}
