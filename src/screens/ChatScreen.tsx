import { useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addMessage, setLoading } from '@/store/slices/chatSlice';
import { setEmotion, setIsAnimating } from '@/store/slices/characterSlice';
import { AnimeCharacter } from '@/components/AnimeCharacter';
import { ChatInterface } from '@/components/ChatInterface';
import { detectEmotion, shouldTriggerAnimation } from '@/utils/emotionDetection';
import { createMessage } from '@/utils/chatHelpers';
import { getAIResponse } from '@/api/openai';
import { hasApiKey } from '@/config/env';

const ChatScreenContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[6]};
  height: 100vh;
  padding: ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.background};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const CharacterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fonts.size.lg};
`;

const NoAPIKeyMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.gray[800]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => theme.spacing[4]};
`;

export function ChatScreen() {
  const dispatch = useAppDispatch();
  const { messages, isLoading } = useAppSelector((state) => state.chat);
  const characterState = useAppSelector((state) => state.character);
  const userState = useAppSelector((state) => state.user);

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!hasApiKey()) {
      // Fallback responses when no API key is available
      const fallbackResponses = [
        "Hello! I'm Mag, your anime companion! How are you feeling today?",
        "That's interesting! Tell me more about that.",
        "I'm here to chat with you! What's on your mind?",
        "I love talking with you! What would you like to discuss?",
        "That sounds wonderful! I'm so glad you shared that with me.",
      ];
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      // Add user message
      const userMessage = createMessage(messageText, 'user');
      dispatch(addMessage(userMessage));
      
      // Detect emotion from user message
      const emotionAnalysis = detectEmotion(messageText);
      if (shouldTriggerAnimation(emotionAnalysis.primaryEmotion, emotionAnalysis.confidence)) {
        dispatch(setEmotion(emotionAnalysis.primaryEmotion));
        dispatch(setIsAnimating(true));
        
        // Stop animation after 2 seconds
        setTimeout(() => {
          dispatch(setIsAnimating(false));
        }, 2000);
      }
      
      // Add AI response
      setTimeout(() => {
        const aiMessage = createMessage(randomResponse, 'ai');
        dispatch(addMessage(aiMessage));
      }, 1000);
      
      return;
    }

    // Add user message
    const userMessage = createMessage(messageText, 'user');
    dispatch(addMessage(userMessage));
    
    // Detect emotion from user message
    const emotionAnalysis = detectEmotion(messageText);
    if (shouldTriggerAnimation(emotionAnalysis.primaryEmotion, emotionAnalysis.confidence)) {
      dispatch(setEmotion(emotionAnalysis.primaryEmotion));
      dispatch(setIsAnimating(true));
      
      // Stop animation after 2 seconds
      setTimeout(() => {
        dispatch(setIsAnimating(false));
      }, 2000);
    }
    
    // Get AI response
    dispatch(setLoading(true));
    try {
      const messagesForApi = [...messagesRef.current, userMessage];
      const aiResponse = await getAIResponse(messagesForApi, 'Mag');
      const aiMessage = createMessage(aiResponse.text, 'ai');
      dispatch(addMessage(aiMessage));
      
      // Detect emotion from AI response
      const aiEmotionAnalysis = detectEmotion(aiResponse.text);
      if (shouldTriggerAnimation(aiEmotionAnalysis.primaryEmotion, aiEmotionAnalysis.confidence)) {
        dispatch(setEmotion(aiEmotionAnalysis.primaryEmotion));
        dispatch(setIsAnimating(true));
        
        // Stop animation after 2 seconds
        setTimeout(() => {
          dispatch(setIsAnimating(false));
        }, 2000);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = createMessage(
        "I'm sorry, I'm having trouble connecting right now. Can you try again?",
        'ai'
      );
      dispatch(addMessage(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Add welcome message on first load
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = createMessage(
        "Hello! I'm Mag, your emotional anime companion! I'm here to chat with you and respond to your emotions. How are you feeling today? 😊",
        'ai'
      );
      dispatch(addMessage(welcomeMessage));
    }
  }, [dispatch, messages.length]);

  return (
    <ChatScreenContainer>
      <CharacterSection>
        <WelcomeMessage>
          <h2>Mag - Your Anime Companion</h2>
          <p>I respond to your emotions with expressions and animations!</p>
        </WelcomeMessage>
        
        <AnimeCharacter
          emotion={characterState.emotion}
          isAnimating={characterState.isAnimating}
          appearance={userState.preferences.characterAppearance}
        />
      </CharacterSection>
      
      <ChatSection>
        {!hasApiKey() && (
          <NoAPIKeyMessage>
            <h3>No API Key Detected</h3>
            <p>
              To enable AI responses, please set your VITE_GROQ_API_KEY environment variable.
              For now, I'll use fallback responses.
            </p>
          </NoAPIKeyMessage>
        )}
        
        <ChatInterface
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
        />
      </ChatSection>
    </ChatScreenContainer>
  );
} 