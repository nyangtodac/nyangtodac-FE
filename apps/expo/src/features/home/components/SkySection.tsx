import { Text, View } from '@src/components/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WAVE_LAYOUT } from '../constants';

export function SkySection(): React.ReactNode {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-white items-center justify-center"
      style={{
        height: WAVE_LAYOUT.SKY_HEIGHT,
        paddingTop: insets.top,
      }}
    >
      <Text>Sky</Text>
    </View>
  );
}
