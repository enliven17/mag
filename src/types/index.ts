export type EmotionType = 'happy' | 'sad' | 'angry' | 'surprised' | 'neutral' | 'excited' | 'worried' | 'confused';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: EmotionType;
}

export interface CharacterState {
  emotion: EmotionType;
  isAnimating: boolean;
  currentAnimation: string;
}

export interface UserPreferences {
  characterAppearance: {
    hairColor: string;
    eyeColor: string;
    outfit: string;
  };
  voiceEnabled: boolean;
  autoResponse: boolean;
}

export interface AppState {
  chat: {
    messages: ChatMessage[];
    isLoading: boolean;
  };
  character: CharacterState;
  user: {
    preferences: UserPreferences;
    isAuthenticated: boolean;
  };
}

export interface EmotionAnalysis {
  primaryEmotion: EmotionType;
  confidence: number;
  intensity: number;
} 