import { scale } from 'react-native-size-matters';

export const WAVE_LAYOUT = {
  SKY_HEIGHT: scale(300),
  HORIZON_HEIGHT: scale(100),
} as const;

export const FOREGROUND = {
  SPEED_MULTIPLIER: 1,
  FREQUENCY: 2,
  AMPLITUDE: 15,
  OFFSET: 0,
} as const;

export const MIDGROUND = {
  SPEED_MULTIPLIER: 0.3,
  FREQUENCY: 2,
  AMPLITUDE: 8,
  OFFSET: -5,
} as const;

export const BACKGROUND = {
  SPEED_MULTIPLIER: 0.7,
  FREQUENCY: 2,
  AMPLITUDE: 4,
  OFFSET: -10,
} as const;
