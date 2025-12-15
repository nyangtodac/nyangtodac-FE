import { Text, View } from '@src/components/ui';
import { FlatList } from 'react-native-gesture-handler';

interface ChatListProps {
  chats: Chat[];
}

export interface Chat {
  sender: 'USER' | 'AI';
  message: string;
  time: string;
}

export default function ChatList({ chats }: ChatListProps) {
  return (
    <FlatList
      data={chats}
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
            <View className="ml-10 bg-blue-100 rounded-xl p-4">
              <Text className="text-body text-lg font-medium">
                {chat.message}
              </Text>
            </View>
          ) : (
            <View className="flex flex-row items-center gap-3">
              <View className="w-12 h-12 bg-red-100 rounded-full" />
              <View className="mr-10 bg-red-100 rounded-xl p-4">
                <Text className="text-body text-lg font-medium">
                  {chat.message}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    />
  );
}
