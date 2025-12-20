import { Pressable } from '@src/components/ui';

import { useCBTModal } from '../context';

export default function CBTOverlay() {
  const { isCBTModalVisible } = useCBTModal();

  if (!isCBTModalVisible) return null;

  return (
    <Pressable className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50" />
  );
}
