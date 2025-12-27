import { AnimatedProp, Path, PathDef } from '@shopify/react-native-skia';

export default function ForegroundWave({
  path,
}: {
  path: AnimatedProp<PathDef>;
}): React.ReactNode {
  return (
    <Path
      path={path}
      color="#000080"
      opacity={1}
    />
  );
}
