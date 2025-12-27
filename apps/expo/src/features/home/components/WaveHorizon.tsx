import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';
import {
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';

import { WAVE_LAYOUT } from '../constants';

export function WaveHorizon(): React.ReactNode {
  const { width } = useWindowDimensions();

  const clock = useSharedValue(0);

  useFrameCallback((frameInfo) => {
    if (!frameInfo.timeSincePreviousFrame) return;
    clock.value += frameInfo.timeSincePreviousFrame * 0.003;
  });

  const animatedPath = useDerivedValue(() => {
    const path = Skia.Path.Make();

    const verticalOffset = WAVE_LAYOUT.HORIZON_HEIGHT / 2;

    path.moveTo(0, verticalOffset);

    for (let x = 0; x <= width + 10; x += 10) {
      // y = A * sin(Bx + C) + D
      const angle =
        (x / width) * (Math.PI * WAVE_LAYOUT.FREQUENCY) + clock.value;
      const y = WAVE_LAYOUT.AMPLITUDE * Math.sin(angle) + verticalOffset;

      path.lineTo(x, y);
    }

    path.lineTo(width, WAVE_LAYOUT.HORIZON_HEIGHT + 10);
    path.lineTo(0, WAVE_LAYOUT.HORIZON_HEIGHT + 10);
    path.close();

    return path;
  }, [width]);

  return (
    <Canvas
      style={{
        width: width,
        height: WAVE_LAYOUT.HORIZON_HEIGHT,
      }}
    >
      <Path
        path={animatedPath}
        color="#000080"
      />
    </Canvas>
  );
}
