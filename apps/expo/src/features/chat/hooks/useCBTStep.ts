import { useCallback, useMemo, useState } from 'react';

import {
  CBTSelections,
  IntensityLevel,
  SymptomType,
  TriggerType,
  initialSelections,
} from '../types';

const TOTAL_STEPS = 3;

export function useCBTStep(onComplete: (selections: CBTSelections) => void) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] =
    useState<CBTSelections>(initialSelections);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setSelections(initialSelections);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      return false;
    }
    onComplete(selections);
    return true;
  }, [currentStep, onComplete, selections]);

  const setSymptom = useCallback((symptom: SymptomType) => {
    setSelections((prev) => ({ ...prev, symptom }));
  }, []);

  const setIntensity = useCallback((intensity: IntensityLevel) => {
    setSelections((prev) => ({ ...prev, intensity }));
  }, []);

  const setTrigger = useCallback((trigger: TriggerType) => {
    setSelections((prev) => ({ ...prev, trigger }));
  }, []);

  const isNextDisabled = useMemo(() => {
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
  }, [currentStep, selections.symptom, selections.trigger]);

  const isLastStep = currentStep === TOTAL_STEPS;

  return {
    currentStep,
    selections,
    isNextDisabled,
    isLastStep,
    nextStep,
    reset,
    setSymptom,
    setIntensity,
    setTrigger,
  };
}
