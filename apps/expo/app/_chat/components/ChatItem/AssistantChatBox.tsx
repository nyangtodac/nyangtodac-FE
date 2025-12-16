import { Text, View } from '@src/components/ui';

import type { AssistantChat } from '../../types';

interface AssistantChatBoxProps {
  chat: AssistantChat;
}

export function AssistantChatBox({ chat }: AssistantChatBoxProps) {
  return (
    <View className="flex flex-row items-start gap-3 max-w-[90%]">
      <View className="w-12 h-12 bg-red-100 rounded-full" />
      <View className="flex flex-col items-start gap-2">
        {chat.messages.map((message, index) => (
          <View
            key={chat.time + index}
            className="mr-10 bg-red-100 rounded-xl p-4"
          >
            <Text className="text-body text-lg font-medium">{message}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
