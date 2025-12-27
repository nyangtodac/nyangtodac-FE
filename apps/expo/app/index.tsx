import { View } from '@src/components/ui';
import { DeepSeaSection, SkySection, WaveHorizon } from '@src/features/home/';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen(): React.ReactNode {
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <SkySection />
        <WaveHorizon />
        <DeepSeaSection />
      </ScrollView>
    </View>
  );
}
