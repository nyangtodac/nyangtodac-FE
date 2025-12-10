import type { ImageProps } from 'expo-image';
import { Image as NImage } from 'expo-image';
import { cssInterop } from 'nativewind';

interface Props extends ImageProps {
  className?: string;
}

cssInterop(NImage, { className: 'style' });

export function Image({ style, placeholder, className, ...props }: Props) {
  return (
    <NImage
      style={style}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  );
}

export const preloadImages = (sources: string[]) => {
  NImage.prefetch(sources);
};
