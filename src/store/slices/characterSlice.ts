import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterState, EmotionType } from '@/types';

const initialState: CharacterState = {
  emotion: 'neutral',
  isAnimating: false,
  currentAnimation: 'idle',
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setEmotion: (state, action: PayloadAction<EmotionType>) => {
      state.emotion = action.payload;
    },
    setIsAnimating: (state, action: PayloadAction<boolean>) => {
      state.isAnimating = action.payload;
    },
    setCurrentAnimation: (state, action: PayloadAction<string>) => {
      state.currentAnimation = action.payload;
    },
    updateCharacterState: (state, action: PayloadAction<Partial<CharacterState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setEmotion,
  setIsAnimating,
  setCurrentAnimation,
  updateCharacterState,
} = characterSlice.actions;

export default characterSlice.reducer; 