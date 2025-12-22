import { Pressable, Text, View } from '@src/components/ui';

import { CBT_MODAL_MESSAGES } from '../../constants';
import { TRIGGER_OPTIONS, TriggerType } from '../../types';
import StepLayout from './StepLayout';

interface TriggerStepProps {
  selectedTrigger: TriggerType;
  onSelect: (trigger: TriggerType) => void;
}

export default function TriggerStep({
  selectedTrigger,
  onSelect,
}: TriggerStepProps) {
  return (
    <StepLayout
      title={CBT_MODAL_MESSAGES.STEP.TRIGGER.TITLE}
      subtitle={CBT_MODAL_MESSAGES.STEP.TRIGGER.SUBTITLE}
    >
      <View className="flex flex-row flex-wrap justify-center gap-3 mt-2">
        {TRIGGER_OPTIONS.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            className={`py-3 px-5 rounded-full border-2 ${
              selectedTrigger === option.value
                ? 'bg-neutral-600 border-neutral-650'
                : 'bg-neutral-100 border-neutral-300'
            }`}
          >
            <Text
              className={`text-body-medium ${
                selectedTrigger === option.value
                  ? 'text-white font-semibold'
                  : 'text-neutral-900'
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </StepLayout>
  );
}
