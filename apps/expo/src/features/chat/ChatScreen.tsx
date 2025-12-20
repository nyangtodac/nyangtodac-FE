import { Pressable } from '@src/components/ui';

import { ChatModalHeader, ChatOverlay } from './components';
import CBTOverlay from './components/CBTOverlay';
import ChatContainer from './components/ChatContainer/ChatContainer';
import { ChatModalProvider } from './context';
import { CBTModalProvider, useCBTModal } from './context/CBTModalContext';
import { useChat } from './hooks';

export default function ChatScreen() {
  return (
    <ChatModalProvider>
      <CBTModalProvider>
        <ChatContent />
      </CBTModalProvider>
    </ChatModalProvider>
  );
}

function ChatContent() {
  const { input, list, handlers } = useChat();
  const { isCBTModalVisible, closeModal: closeCBTModal } = useCBTModal();

  return (
    <>
      <ChatOverlay />
      <CBTOverlay />

      <Pressable
        className="flex flex-1 flex-col justify-end w-full"
        onPress={() => {
          if (isCBTModalVisible) {
            closeCBTModal();
            return;
          }
          input.inputRef.current?.blur();
        }}
      >
        <ChatModalHeader onBack={handlers.handleBack} />

        <ChatContainer
          list={list}
          input={input}
          handlers={handlers}
        />
        {/* CBT Modal */}
      </Pressable>
    </>
  );
}
