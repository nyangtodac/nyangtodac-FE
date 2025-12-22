import { useCallback, useMemo, useState } from 'react';

import { CBT_STEP, CBT_TOTAL_STEPS } from '../constants';
import {
  CBTSelections,
  IntensityLevel,
  SymptomType,
  TriggerType,
  initialSelections,
} from '../types';

export function useCBTStep(onComplete: (selections: CBTSelections) => void) {
  const [currentStep, setCurrentStep] = useState<number>(CBT_STEP.SYMPTOM);
  const [selections, setSelections] =
    useState<CBTSelections>(initialSelections);

  const reset = useCallback(() => {
    setCurrentStep(CBT_STEP.SYMPTOM);
    setSelections(initialSelections);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < CBT_TOTAL_STEPS) {
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
      case CBT_STEP.SYMPTOM:
        return selections.symptom === null;
      case CBT_STEP.INTENSITY:
        return false;
      case CBT_STEP.TRIGGER:
        return selections.trigger === null;
      default:
        return true;
    }
  }, [currentStep, selections.symptom, selections.trigger]);

  const isLastStep = currentStep === CBT_TOTAL_STEPS;

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
