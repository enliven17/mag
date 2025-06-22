export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  SETTINGS: '/settings',
  CHARACTER: '/character',
} as const;

export const ANIMATIONS = {
  IDLE: 'idle',
  HAPPY: 'happy',
  SAD: 'sad',
  ANGRY: 'angry',
  SURPRISED: 'surprised',
  EXCITED: 'excited',
  WORRIED: 'worried',
  CONFUSED: 'confused',
  WAVE: 'wave',
  NOD: 'nod',
  SHAKE_HEAD: 'shake_head',
} as const;

export const EMOTION_KEYWORDS = {
  happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'love', 'like', 'good', 'positive'],
  sad: ['sad', 'depressed', 'unhappy', 'sorry', 'regret', 'miss', 'lonely', 'hurt', 'pain', 'negative'],
  angry: ['angry', 'mad', 'furious', 'hate', 'annoyed', 'frustrated', 'upset', 'irritated', 'rage'],
  surprised: ['surprised', 'shocked', 'amazed', 'wow', 'unexpected', 'sudden', 'astonished'],
  excited: ['excited', 'thrilled', 'eager', 'enthusiastic', 'pumped', 'energetic', 'motivated'],
  worried: ['worried', 'anxious', 'concerned', 'nervous', 'scared', 'afraid', 'fear', 'stress'],
  confused: ['confused', 'puzzled', 'unsure', 'uncertain', 'doubt', 'question', 'what'],
  neutral: ['okay', 'fine', 'alright', 'normal', 'regular', 'standard', 'usual'],
} as const;

export const API_ENDPOINTS = {
  OPENAI_CHAT: 'https://api.openai.com/v1/chat/completions',
  EMOTION_ANALYSIS: '/api/emotion-analysis',
} as const;

export const CHARACTER_CONFIG = {
  DEFAULT_APPEARANCE: {
    hairColor: '#8B4513',
    eyeColor: '#4169E1',
    outfit: 'casual',
  },
  ANIMATION_SPEED: 1.0,
  TRANSITION_DURATION: 0.5,
} as const;

export const CHAT_CONFIG = {
  MAX_MESSAGES: 100,
  TYPING_SPEED: 50, // ms per character
  AUTO_SCROLL_DELAY: 100,
} as const; 