import catDefaultImage from '@assets/images/cat/default_shadow.webp';
import backgroundImage from '@assets/images/home/background.webp';
import { Image, View } from '@src/components/ui';
import { ChatScreen } from '@src/features/chat';

export default function HomeScreen(): React.ReactNode {
  return (
    <View className="flex-1 bg-green-100 relative">
      <Image
        source={backgroundImage}
        className="absolute bottom-0 w-full h-full"
        contentFit="cover"
      />

      <View className="absolute inset-x-0 bottom-0 items-center justify-end h-[50%] pb-20 pointer-events-none">
        <Image
          source={catDefaultImage}
          className="w-[60%] h-full"
          contentFit="contain"
        />
      </View>

      <ChatScreen />
    </View>
  );
}
