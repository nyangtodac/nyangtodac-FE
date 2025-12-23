import { useMemo, useState } from 'react';

import catDefaultImage from '@assets/images/cat/default_shadow.webp';
import backgroundImage from '@assets/images/home/background.webp';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { Image, Text, View } from '@src/components/ui';
import { ChatScreen } from '@src/features/chat';
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

const BlobButton = ({
  item,
  size,
  onPress,
}: {
  item: {
    label: string;
    blobPath: string;
    offset: { x: number; y: number };
    slug: string;
  };
  size: number;
  onPress: (item: string) => void;
}) => {
  const transformedPath = useMemo(() => {
    const originPath = Skia.Path.MakeFromSVGString(item.blobPath)!;
    const srcRect = originPath.getBounds();

    const scaleFactor = (size / srcRect.width) * 0.9;
    const m = Skia.Matrix();

    m.translate(size / 2, size / 2);
    m.scale(scaleFactor, scaleFactor);

    const p = originPath.copy();
    p.transform(m);
    return p;
  }, [size]);

  const handlePress = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    const { locationX, locationY } = e.nativeEvent;

    if (transformedPath.contains(locationX, locationY)) {
      onPress(item.slug);
    } else {
      console.log('빈 공간 터치됨 (무시)');
    }
  };

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: item.slug === 'recognition' ? 'red' : 'blue',
      }}
    >
      <Canvas
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: [
            { translateX: item.offset.x },
            { translateY: item.offset.y },
          ],
        }}
      >
        <Path
          path={transformedPath}
          color="white"
          style="fill"
        />
        <Path
          path={transformedPath}
          color="#E5E7EB"
          style="stroke"
          strokeWidth={5}
          strokeJoin="round"
          strokeCap="round"
        />
      </Canvas>

      <Pressable
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            { translateX: item.offset.x },
            { translateY: item.offset.y },
          ],
        }}
        onPress={handlePress}
      >
        <View pointerEvents="none">
          <Text className="text-body-large">{item.label}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default function HomeScreen(): React.ReactNode {
  const insets = useSafeAreaInsets();

  const ITEM_SIZE = Dimensions.get('window').width / 3;

  const [data, _] = useState([
    {
      label: '인지재구성',
      blobPath:
        'M57.7,-58C70.6,-44.8,73.9,-22.4,71.3,-2.6C68.7,17.2,60.2,34.5,47.4,47C34.5,59.5,17.2,67.2,0.9,66.3C-15.4,65.4,-30.9,55.8,-46.8,43.3C-62.7,30.9,-79.1,15.4,-79.2,-0.1C-79.3,-15.6,-63.1,-31.2,-47.2,-44.4C-31.2,-57.6,-15.6,-68.4,3.4,-71.8C22.4,-75.2,44.8,-71.2,57.7,-58Z',
      offset: { x: -2, y: -2 },
      slug: 'recognition',
    },
    {
      label: '호흡법',
      blobPath:
        'M51.9,-52.4C66.4,-37.3,76.9,-18.7,78.9,2C80.9,22.6,74.4,45.3,59.8,56C45.3,66.6,22.6,65.4,1.5,63.9C-19.7,62.4,-39.4,60.7,-55.9,50C-72.3,39.4,-85.7,19.7,-86.6,-1C-87.6,-21.6,-76.2,-43.2,-59.7,-58.3C-43.2,-73.4,-21.6,-82,-1.5,-80.6C18.7,-79.1,37.3,-67.5,51.9,-52.4Z',
      offset: { x: 3, y: 3 },
      slug: 'breathing',
    },
    {
      label: '진정문구',
      blobPath:
        'M50.3,-49.2C64.6,-35.9,75.3,-18,76.5,1.3C77.8,20.5,69.6,41,55.3,52.8C41,64.6,20.5,67.8,1.7,66.1C-17.1,64.5,-34.3,58,-45.8,46.1C-57.3,34.3,-63.3,17.1,-66.3,-3.1C-69.4,-23.2,-69.5,-46.5,-58,-59.8C-46.5,-73.1,-23.2,-76.4,-2.6,-73.8C18,-71.1,35.9,-62.5,50.3,-49.2Z',
      offset: { x: 1, y: 1 },
      slug: 'calm',
    },
    {
      label: '5-4-3-2-1',
      blobPath:
        'M53,-47.3C69.5,-36.5,84.3,-18.2,85.4,1.1C86.5,20.4,73.8,40.8,57.3,53.5C40.8,66.1,20.4,71.1,2.6,68.5C-15.3,66,-30.5,55.9,-45.4,43.2C-60.3,30.5,-74.9,15.3,-76.5,-1.6C-78.1,-18.5,-66.9,-37.1,-52,-47.9C-37.1,-58.8,-18.5,-61.9,-0.2,-61.8C18.2,-61.6,36.5,-58.2,53,-47.3Z',
      offset: { x: -1, y: -1 },
      slug: 'grounding',
    },
    {
      label: '일기',
      blobPath:
        'M50.8,-46.4C65.9,-35.6,78.4,-17.8,81,2.6C83.6,23.1,76.4,46.1,61.3,56.7C46.1,67.2,23.1,65.3,2,63.2C-19,61.2,-38,59.1,-48.8,48.5C-59.6,38,-62.3,19,-61.2,1.1C-60.1,-16.8,-55.3,-33.7,-44.5,-44.5C-33.7,-55.2,-16.8,-59.9,0.5,-60.4C17.8,-60.9,35.6,-57.2,50.8,-46.4Z',
      offset: { x: 2, y: 3 },
      slug: 'diary',
    },
    {
      label: '학습',
      blobPath:
        'M59.7,-58C73.5,-45.8,78.4,-22.9,75.2,-3.1C72.1,16.6,61,33.2,47.1,44C33.2,54.7,16.6,59.5,-1.9,61.4C-20.5,63.3,-40.9,62.4,-56.5,51.6C-72,40.9,-82.7,20.5,-82.3,0.4C-81.8,-19.6,-70.3,-39.2,-54.8,-51.4C-39.2,-63.6,-19.6,-68.3,1.6,-70C22.9,-71.6,45.8,-70.2,59.7,-58Z',
      offset: { x: -7, y: -7 },
      slug: 'study',
    },
  ]);

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
          className="w-[60%] max-w-[300px] h-full"
          contentFit="contain"
        />
      </View>

      <View
        className="flex-row flex-wrap justify-center items-center"
        style={{ paddingTop: insets.top + scale(20) }}
      >
        {data.map((item, index) => (
          <BlobButton
            key={index}
            item={item}
            size={ITEM_SIZE}
            onPress={(clickedItem) => console.log(`클릭 성공: ${clickedItem}`)}
          />
        ))}
      </View>

      <ChatScreen />
    </View>
  );
}
