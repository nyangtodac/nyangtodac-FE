import { Text, View } from '@src/components/ui';

import type { UserChat } from '../../types';

interface UserChatBoxProps {
  chat: UserChat;
}

export function UserChatBox({ chat }: UserChatBoxProps) {
  return (
    <View className="ml-10 bg-blue-100 rounded-xl p-4 max-w-[90%]">
      <Text className="text-body text-lg font-medium">{chat.message}</Text>
    </View>
  );
}
