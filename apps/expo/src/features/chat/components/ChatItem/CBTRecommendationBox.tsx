import { Text, View } from '@src/components/ui';

import {
  CBT_INTENSITY_LABELS,
  CBT_SYMPTOM_LABELS,
  CBT_TRIGGER_LABELS,
} from '../../constants';
import type { CBTRecommendation, IntensityLevel } from '../../types';

interface CBTRecommendationBoxProps {
  chat: CBTRecommendation;
}

export default function CBTRecommendationBox({
  chat,
}: CBTRecommendationBoxProps) {
  const { intensity, situation, symptom } = chat.options;

  return (
    <View className="flex flex-col items-start bg-chat-user rounded-xl p-4 self-end gap-2">
      <Text className="text-body-medium text-neutral-400">
        {`${chat.time}`}
      </Text>
      <View className="flex flex-row items-center gap-2">
        <Text className="text-body-medium text-white bg-neutral-650 rounded-md p-2">
          {CBT_SYMPTOM_LABELS[symptom as keyof typeof CBT_SYMPTOM_LABELS]}
        </Text>
        <Text className="text-body-medium text-white bg-neutral-650 rounded-md p-2">
          {CBT_INTENSITY_LABELS[intensity as IntensityLevel]}
        </Text>
        <Text className="text-body-medium text-white bg-neutral-650 rounded-md p-2">
          {CBT_TRIGGER_LABELS[situation as keyof typeof CBT_TRIGGER_LABELS]}
        </Text>
      </View>
    </View>
  );
}
