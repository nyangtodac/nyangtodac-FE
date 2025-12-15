import { useCallback, useRef, useState } from 'react';

import { Pressable } from '@src/components/ui';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChatInputBar from './ChatInputBar';
import ChatList, { Chat } from './ChatList';
import ChatModalHeader from './ChatModalHeader';
import ChatOverlay from './ChatOverlay';

const chatMockData = [
  // --- 최신 (화면 맨 아래) ---
  {
    sender: 'AI',
    message: '언제든 또 찾아와 줘',
    time: '12:08',
  },
  {
    sender: 'AI',
    message: '오늘 밤은 푹 자길 바랄게',
    time: '12:08',
  },
  {
    sender: 'USER',
    message: '고마워, 덕분에 마음이 좀 편해졌어.',
    time: '12:07',
  },
  {
    sender: 'AI',
    message: '정말 멋진 생각이야',
    time: '12:06',
  },
  {
    sender: 'AI',
    message: '너는 충분히 용기 있는 사람이야',
    time: '12:06',
  },
  {
    sender: 'AI',
    message: '거절당해도 네 잘못이 아니야',
    time: '12:06',
  },
  {
    sender: 'AI',
    message: '천천히 다가가도 괜찮아',
    time: '12:06',
  },
  {
    sender: 'USER',
    message:
      '내일 학교 가서 내가 먼저 말을 걸어볼게. 받아줄지 모르겠지만 용기내볼게.',
    time: '12:05',
  },
  {
    sender: 'AI',
    message: '그리고 나서 친구들과 다시 얘기해보는건 어때?',
    time: '12:04',
  },
  {
    sender: 'AI',
    message: '일단 숨을 깊게 쉬고 마음을 가라앉혀봐',
    time: '12:04',
  },
  {
    sender: 'AI',
    message: '그랬구나',
    time: '12:04',
  },
  {
    sender: 'USER',
    message:
      '학교에서 친구들과 싸웠어. 그런데 나는 친구들을 미워해. 어떻게 해야할까? 나는 다시 화해하고 싶어. 근데 너무 불안하고 화가 나',
    time: '12:03',
  },
  {
    sender: 'AI',
    message: '지금 감정이 어떤지 나에게 알려줘',
    time: '12:02',
  },
  {
    sender: 'AI',
    message: '오늘은 무슨 일이 있었어?',
    time: '12:01',
  },
  {
    sender: 'AI',
    message: '안녕 나는 냥토닥이야',
    time: '12:00',
  },
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const flatListRef = useRef<FlatList>(null);

  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>(chatMockData as Chat[]);

  const keyboardHeight = useSharedValue<number>(0);

  useKeyboardHandler({
    onMove: (e) => {
      'worklet';
      keyboardHeight.value = e.height;
    },
  });

  const inputAnimatedStyle = useAnimatedStyle(() => {
    const actualHeight = Math.max(keyboardHeight.value, insets.bottom);

    return {
      paddingBottom: actualHeight + 16,
    };
  });

  const handleBack = useCallback(() => {
    setIsChatModalVisible(false);
    setMessage('');
    inputRef.current?.blur();
  }, []);

  const handleInputFocus = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    setIsChatModalVisible(true);
  }, []);

  const handleSend = useCallback(() => {
    if (!message.trim()) return;

    inputRef.current?.clear();
    inputRef.current?.blur();
    setChats((prev) => [
      { sender: 'USER', message, time: new Date().toISOString() },
      ...prev,
    ]);
    setMessage('');
  }, [message]);

  return (
    <>
      <ChatOverlay visible={isChatModalVisible} />

      <Pressable
        className="flex flex-1 flex-col justify-end w-full"
        onPress={() => inputRef.current?.blur()}
      >
        {isChatModalVisible && <ChatModalHeader onBack={handleBack} />}

        <Animated.View
          className="flex flex-1 flex-col justify-end px-4"
          style={[inputAnimatedStyle]}
        >
          {isChatModalVisible && (
            <ChatList
              ref={flatListRef}
              chats={chats}
            />
          )}
          <ChatInputBar
            ref={inputRef}
            message={message}
            onMessageChange={setMessage}
            onFocus={handleInputFocus}
            onSend={handleSend}
            paddingBottom={keyboardHeight}
            isChatModalVisible={isChatModalVisible}
            setIsChatModalVisible={setIsChatModalVisible}
          />
        </Animated.View>
      </Pressable>
    </>
  );
}
