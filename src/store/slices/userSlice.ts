import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences } from '@/types';

interface UserState {
  preferences: UserPreferences;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  preferences: {
    characterAppearance: {
      hairColor: '#8B4513',
      eyeColor: '#4169E1',
      outfit: 'casual',
    },
    voiceEnabled: false,
    autoResponse: true,
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    updateCharacterAppearance: (
      state,
      action: PayloadAction<Partial<UserPreferences['characterAppearance']>>
    ) => {
      state.preferences.characterAppearance = {
        ...state.preferences.characterAppearance,
        ...action.payload,
      };
    },
  },
});

export const {
  updatePreferences,
  setAuthenticated,
  updateCharacterAppearance,
} = userSlice.actions;

export default userSlice.reducer; 