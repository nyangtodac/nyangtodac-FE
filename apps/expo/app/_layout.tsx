import { I18nProvider } from '@src/lib/i18n';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import '../global.css';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout(): React.ReactNode {
  return (
    <I18nProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(pages)" />
      </Stack>
    </I18nProvider>
  );
}
