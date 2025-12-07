import { Button } from '@nyangtodac/ui';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ButtonPage() {
  return (
    <View>
      <Button
        text="button"
        color="primary"
        size="default"
        disabled={false}
        fullWidth={false}
      />
      <View className="w-full h-1/2 mt-2">
        <WebView source={{ uri: 'http://localhost:3000' }} />
      </View>
    </View>
  );
}
