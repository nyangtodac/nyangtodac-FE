import { useCallback, useMemo, useState } from 'react';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import { Modal, Pressable, Text, View } from '@src/components/ui';

import colors from '@nyangtodac/tailwind-design-tokens/colors';

// Types
type SymptomType = 'BODY' | 'MIND' | null;
type TriggerType =
  | 'PRESENTATION_EXAM'
  | 'RELATIONSHIP'
  | 'HEALTH_DEATH'
  | 'FUTURE_MONEY'
  | 'UNKNOWN'
  | null;

interface CBTSelections {
  symptom: SymptomType;
  intensity: number;
  trigger: TriggerType;
}

const initialSelections: CBTSelections = {
  symptom: null,
  intensity: 3,
  trigger: null,
};

// Mock Data
const SYMPTOM_OPTIONS: { value: SymptomType; label: string }[] = [
  { value: 'BODY', label: '응, 몸부터 진정시켜줘' },
  { value: 'MIND', label: '아니, 머릿속 생각들이 더 문제야' },
];

const INTENSITY_LEVELS = [1, 2, 3, 4, 5];

const TRIGGER_OPTIONS: { value: TriggerType; label: string }[] = [
  { value: 'PRESENTATION_EXAM', label: '발표/시험' },
  { value: 'RELATIONSHIP', label: '인간관계' },
  { value: 'HEALTH_DEATH', label: '건강/죽음' },
  { value: 'FUTURE_MONEY', label: '미래/돈' },
  { value: 'UNKNOWN', label: '이유모름' },
];

export default function CBTRecommendModal({
  ref,
}: {
  ref: React.Ref<BottomSheetModal>;
}) {
  const backgroundStyle = useMemo(
    () => ({ backgroundColor: colors.neutral[200] }),
    [],
  );
  const handleIndicatorStyle = useMemo(
    () => ({ backgroundColor: colors.neutral[400] }),
    [],
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] =
    useState<CBTSelections>(initialSelections);

  const resetAndClose = useCallback(() => {
    setCurrentStep(1);
    setSelections(initialSelections);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // 마지막 스텝에서 완료 처리
      console.log('CBT 선택 완료:', selections);
      resetAndClose();
    }
  }, [currentStep, selections, resetAndClose]);

  const setSymptom = useCallback((symptom: SymptomType) => {
    setSelections((prev) => ({ ...prev, symptom }));
  }, []);

  const setIntensity = useCallback((intensity: number) => {
    setSelections((prev) => ({ ...prev, intensity }));
  }, []);

  const setTrigger = useCallback((trigger: TriggerType) => {
    setSelections((prev) => ({ ...prev, trigger }));
  }, []);

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return selections.symptom === null;
      case 2:
        return false;
      case 3:
        return selections.trigger === null;
      default:
        return true;
    }
  };

  const getButtonText = () => {
    if (currentStep === 3) return '선택완료';
    return '다음';
  };

  // Step 1: 증상 선택
  const renderStep1 = () => (
    <View className="flex flex-col gap-4">
      <Text className="text-body-large text-neutral-900 text-center font-medium leading-relaxed">
        지금 혹시 숨쉬기가 힘들거나{'\n'}몸이 제멋대로 반응하고 있어?
      </Text>
      <View className="flex flex-col gap-3 mt-2">
        {SYMPTOM_OPTIONS.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => setSymptom(option.value)}
            className={`py-4 px-5 rounded-2xl border-2 ${
              selections.symptom === option.value
                ? 'bg-neutral-600 border-neutral-650'
                : 'bg-neutral-100 border-neutral-300'
            }`}
          >
            <Text
              className={`text-body-medium text-center ${
                selections.symptom === option.value
                  ? 'text-white font-semibold'
                  : 'text-neutral-900'
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  // Step 2: 강도 선택 (슬라이더)
  const handleSliderChange = useCallback(
    (value: number) => {
      const roundedValue = Math.round(value);
      if (roundedValue !== selections.intensity) {
        setIntensity(roundedValue);
      }
    },
    [selections.intensity, setIntensity],
  );

  const renderStep2 = () => (
    <View className="flex flex-col gap-2">
      <Text className="text-body-large text-neutral-900 text-center font-medium">
        지금 느끼는 불안의 강도는 어때?
      </Text>
      <Text className="text-body-medium text-neutral-650 text-center">
        1부터 5까지, 숫자가 클수록 강해요
      </Text>

      {/* 슬라이더 */}
      <View className="items-center mt-6 w-full px-2">
        {/* 슬라이더 */}
        <Slider
          style={{ width: '100%', height: 50 }}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={selections.intensity}
          onValueChange={handleSliderChange}
          minimumTrackTintColor={colors.neutral[600]}
          maximumTrackTintColor={colors.neutral[300]}
          thumbTintColor={colors.neutral[700]}
        />

        {/* 스텝 숫자 라벨 */}
        <View className="flex-row justify-between w-full px-1 mt-2">
          {INTENSITY_LEVELS.map((level) => (
            <Text
              key={level}
              className={`text-body-medium font-medium ${
                level === selections.intensity
                  ? 'text-neutral-900'
                  : 'text-neutral-500'
              }`}
            >
              {level}
            </Text>
          ))}
        </View>

        {/* 라벨 */}
        <View className="flex-row justify-between w-full mt-1 px-1">
          <Text className="text-body-medium text-neutral-650">조금</Text>
          <Text className="text-body-medium text-neutral-650">매우 심함</Text>
        </View>
      </View>
    </View>
  );

  // Step 3: 트리거 선택
  const renderStep3 = () => (
    <View className="flex flex-col gap-4">
      <Text className="text-body-large text-neutral-900 text-center font-medium">
        어떤 상황이 가장 힘들었어?
      </Text>
      <Text className="text-body-small text-neutral-500 text-center">
        하나를 선택해줘
      </Text>
      <View className="flex flex-row flex-wrap justify-center gap-3 mt-4">
        {TRIGGER_OPTIONS.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => setTrigger(option.value)}
            className={`py-3 px-5 rounded-full border-2 ${
              selections.trigger === option.value
                ? 'bg-primary-100 border-primary-500'
                : 'bg-white border-neutral-300'
            }`}
          >
            <Text
              className={`text-body-medium ${
                selections.trigger === option.value
                  ? 'text-primary-600 font-semibold'
                  : 'text-neutral-700'
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <Modal
      ref={ref}
      backgroundStyle={backgroundStyle}
      handleIndicatorStyle={handleIndicatorStyle}
      onDismiss={resetAndClose}
    >
      <BottomSheetView className="px-5 pt-2 pb-14">
        {/* 스텝 인디케이터 */}
        <View className="flex flex-row justify-center gap-2 mb-5">
          {[1, 2, 3].map((step) => (
            <View
              key={step}
              className={`w-2 h-2 rounded-full ${
                step === currentStep ? 'bg-neutral-600' : 'bg-neutral-400'
              }`}
            />
          ))}
        </View>

        {/* 스텝 내용 */}
        {renderStep()}

        {/* 하단 버튼 영역 */}
        <View className="flex flex-row items-center justify-between mt-6">
          {/* 선택완료/다음 버튼 */}
          <Pressable
            onPress={handleNext}
            disabled={isNextDisabled()}
            className="flex-1 py-4 rounded-2xl items-center justify-center"
          >
            <Text
              className={`text-body-medium font-semibold ${
                isNextDisabled() ? 'opacity-20' : 'opacity-100'
              }`}
            >
              {getButtonText()}
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </Modal>
  );
}
