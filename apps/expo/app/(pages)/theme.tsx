import { useTheme } from '@src/lib/theme';
import { Button, View } from 'react-native';
import WebView from 'react-native-webview';

import { Text } from '@nyangtodac/ui';

export default function ThemePage() {
  const { theme, changeTheme } = useTheme();

  const url = `http://localhost:3000/?theme=${theme}`;

  console.log('url', url);
  return (
    <View className={`flex-1 items-center justify-center gap-4 bg-page`}>
      <Text className="text-2xl font-bold text-body">Theme: {theme}</Text>
      <Button
        onPress={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
        title="change theme"
      />
      <View className="w-full h-1/2 mt-2">
        <WebView source={{ uri: url }} />
      </View>
    </View>
  );
}
