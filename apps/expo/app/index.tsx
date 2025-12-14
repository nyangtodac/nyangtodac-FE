import { useRef, useState } from 'react';

import { Button, Text, View } from '@src/components/ui';
import { KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen(): React.ReactNode {
  const insets = useSafeAreaInsets();

  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [chat, setChat] = useState('');

  const inputRef = useRef<TextInput>(null);

  return (
    <View
      className="flex-1 bg-page"
      style={{ paddingTop: insets.top }}
    >
      {isChatModalVisible && (
        <View className="flex flex-1 absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70" />
      )}
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1"
      >
        <View className="flex flex-1 flex-col items-center justify-end">
          {isChatModalVisible && (
            <>
              <View className="flex flex-row items-end justify-center gap-2 spx-4">
                <Button
                  text="Back"
                  onPress={() => {
                    setIsChatModalVisible(false);
                    inputRef.current?.blur();
                  }}
                  isLoading={false}
                  color="primary"
                  size="sm"
                  fullWidth={false}
                  disabled={false}
                  className="rounded-xl border border-primary py-3"
                />
              </View>
              <View className="flex flex-1 w-full flex-col items-center justify-end gap-2">
                <Text className="text-body text-lg font-medium bg-blue-100">
                  Chat
                </Text>
                <Text className="text-body text-lg font-medium bg-blue-100">
                  Chat
                </Text>
                <Text className="text-body text-lg font-medium bg-blue-100">
                  Chat
                </Text>
              </View>
            </>
          )}
          <View
            className="flex flex-row items-end justify-center gap-2 px-4"
            style={{
              paddingBottom: isChatModalVisible ? 16 : insets.bottom + 16,
            }}
          >
            <TextInput
              ref={inputRef}
              className="mt-0 bg-white rounded-xl border border-solid border-primary p-4 font-inter text-lg font-medium leading-5 text-body grow"
              placeholder="Enter your chat"
              value={chat}
              onChangeText={setChat}
              onFocus={() => setIsChatModalVisible(true)}
            />
            <Button
              text="⬆"
              onPress={() => {
                console.log(chat);
                setChat('');
                inputRef.current?.blur();
              }}
              isLoading={false}
              color="primary"
              size="default"
              fullWidth={false}
              disabled={false}
              className="rounded-xl border border-primary py-3"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
