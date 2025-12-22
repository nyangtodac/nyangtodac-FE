export const ROLE = {
  USER: 'USER',
  AI: 'AI',
  SYSTEM: 'SYSTEM',
} as const;

export const CBT_STEP = {
  SYMPTOM: 1,
  INTENSITY: 2,
  TRIGGER: 3,
} as const;

export const CBT_STEPS = [
  CBT_STEP.SYMPTOM,
  CBT_STEP.INTENSITY,
  CBT_STEP.TRIGGER,
] as const;

export const CBT_TOTAL_STEPS = CBT_STEPS.length;
