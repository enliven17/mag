import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, EmotionType } from '@/types';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  currentInput: string;
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  currentInput: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCurrentInput: (state, action: PayloadAction<string>) => {
      state.currentInput = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    updateMessageEmotion: (
      state,
      action: PayloadAction<{ messageId: string; emotion: EmotionType }>
    ) => {
      const message = state.messages.find(m => m.id === action.payload.messageId);
      if (message) {
        message.emotion = action.payload.emotion;
      }
    },
  },
});

export const {
  addMessage,
  setLoading,
  setCurrentInput,
  clearMessages,
  updateMessageEmotion,
} = chatSlice.actions;

export default chatSlice.reducer; 