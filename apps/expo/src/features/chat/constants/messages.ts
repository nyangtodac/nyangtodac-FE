import type { IntensityLevel } from '../types';

// CBT 옵션 라벨
export const CBT_SYMPTOM_LABELS = {
  BODY: '신체 반응',
  MIND: '심리 불안',
} as const;

export const CBT_INTENSITY_LABELS: Record<IntensityLevel, string> = {
  1: '가벼움',
  2: '신경 쓰임',
  3: '꽤 힘듦',
  4: '심한 괴로움',
  5: '견디기 힘듦',
} as const;

export const CBT_TRIGGER_LABELS = {
  PRESENTATION_EXAM: '발표/시험',
  RELATIONSHIP: '인간관계',
  HEALTH_DEATH: '건강/죽음',
  FUTURE_MONEY: '미래/돈',
  UNKNOWN: '이유 없이 불안',
} as const;

// CBT 모달 메시지
export const CBT_MODAL_MESSAGES = {
  BUTTON: {
    NEXT: '다음',
    COMPLETE: '선택완료',
  },
  STEP: {
    SYMPTOM: {
      TITLE: '지금 혹시 숨쉬기가 힘들거나\n몸이 제멋대로 반응하고 있어?',
    },
    INTENSITY: {
      TITLE_BODY: '몸이 견디기 얼마나 힘든 상태야?',
      TITLE_MIND: '그 마음의 무게가 어느 정도야?',
      SUBTITLE_LIGHT: '가벼움',
      SUBTITLE_HEAVY: '무거움',
    },
    TRIGGER: {
      TITLE: '어떤 상황 때문에 불안했어?',
      SUBTITLE: '하나를 선택해줘',
    },
  },
} as const;

// 채팅 관련 메시지
export const CHAT_MESSAGES = {
  INPUT_PLACEHOLDER: '메시지를 입력해주세요',
  CBT_RECOMMENDATION: {
    QUESTION_SUFFIX: '을 해보시겠어요?',
    BUTTON_ACCEPT: '좋아요',
    BUTTON_REJECT: '괜찮아요',
  },
  CBT_TYPE_LABELS: {
    BREATHING: '호흡 운동',
    CALMING_PHRASE: '진정 문구',
    GROUNDING: '그라운딩',
    COGNITIVE_REFRAME: '인지 재구성',
  },
} as const;
