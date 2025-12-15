import { useCallback, useMemo } from 'react';

import { Text, View } from '@src/components/ui';
import { FlatList } from 'react-native-gesture-handler';

interface ChatListProps {
  chats: Chat[];
  ref: React.RefObject<FlatList | null>;
}

export interface Chat {
  sender: 'USER' | 'AI';
  message: string;
  time: string;
}

interface UserChat {
  sender: 'USER';
  message: string;
  time: string;
}

interface AssistantChat {
  sender: 'AI';
  messages: string[];
  time: string;
}

const UserChatBox = ({ message }: UserChat) => {
  return (
    <View className="ml-10 bg-blue-100 rounded-xl p-4 max-w-[90%]">
      <Text className="text-body text-lg font-medium">{message}</Text>
    </View>
  );
};

const AssistantChatBox = ({ messages, time }: AssistantChat) => {
  return (
    <View className="flex flex-row items-start gap-3 max-w-[90%]">
      <View className="w-12 h-12 bg-red-100 rounded-full" />
      <View className="flex flex-col items-start gap-2">
        {messages.map((message, index) => (
          <View
            key={time + index}
            className="mr-10 bg-red-100 rounded-xl p-4"
          >
            <Text className="text-body text-lg font-medium">{message}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function ChatList({ ref, chats }: ChatListProps) {
  const parseChats = useCallback(
    (chats: Chat[]): (UserChat | AssistantChat)[] => {
      const stack: (UserChat | AssistantChat)[] = [];

      for (const chat of chats) {
        if (chat.sender === 'USER') {
          stack.push(chat as UserChat);
          continue;
        }

        const pop = stack[stack.length - 1];
        if (!pop || pop.sender === 'USER') {
          stack.push({
            sender: 'AI',
            messages: [chat.message],
            time: chat.time,
          });
          continue;
        }

        const popAssistant = pop as AssistantChat;
        popAssistant.messages.unshift(chat.message);
      }

      return stack;
    },
    [],
  );

  const parsedChats = useMemo(() => parseChats(chats), [parseChats, chats]);

  return (
    <FlatList
      ref={ref}
      data={parsedChats}
      inverted={true}
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        gap: 16,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item: chat }) => (
        <View
          className={`flex flex-row items-center ${chat.sender === 'USER' ? 'self-end' : 'self-start'}`}
        >
          {chat.sender === 'USER' ? (
            <UserChatBox {...chat} />
          ) : (
            <AssistantChatBox {...chat} />
          )}
        </View>
      )}
    />
  );
}
