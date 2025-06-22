import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Send, Smile, Mic } from 'lucide-react';
import { ChatMessage } from '@/types';
import { formatTimestamp, sanitizeInput, isMessageEmpty } from '@/utils/chatHelpers';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onTypingStart?: () => void;
  onTypingEnd?: () => void;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[800]};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[600]};
    border-radius: 3px;
  }
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme, isUser }) => 
    isUser ? `${theme.borderRadius.lg} ${theme.borderRadius.lg} ${theme.borderRadius.sm} ${theme.borderRadius.lg}` 
    : `${theme.borderRadius.lg} ${theme.borderRadius.lg} ${theme.borderRadius.lg} ${theme.borderRadius.sm}`
  };
  background: ${({ theme, isUser }) => 
    isUser ? theme.colors.primary[500] : theme.colors.gray[700]
  };
  color: ${({ theme }) => theme.colors.text.primary};
  align-self: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
  word-wrap: break-word;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    ${({ isUser }) => isUser ? 'right' : 'left'}: -8px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: ${({ theme, isUser }) => 
      isUser ? theme.colors.primary[500] : theme.colors.gray[700]
    };
    border-bottom: none;
  }
`;

const MessageText = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.base};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const MessageTime = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  text-align: right;
`;

const InputContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.gray[800]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[700]};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.colors.gray[700]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[2]};
`;

const MessageInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fonts.size.base};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
`;

const SendButton = styled.button<{ disabled: boolean }>`
  background: ${({ theme, disabled }) => 
    disabled ? theme.colors.gray[600] : theme.colors.primary[500]
  };
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing[2]};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary[600]};
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.text.muted};
  border: none;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.gray[600]};
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text.muted};
  font-style: italic;
`;

const TypingDots = styled.div`
  display: flex;
  gap: 4px;
  
  &::before,
  &::after,
  & > div {
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.text.muted};
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
  }
  
  & > div {
    animation-delay: 0.2s;
  }
  
  &::after {
    animation-delay: 0.4s;
  }
  
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
`;

export function ChatInterface({
  messages,
  isLoading,
  onSendMessage,
  onTypingStart,
  onTypingEnd,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const sanitizedMessage = sanitizeInput(inputValue);
    if (!isMessageEmpty(sanitizedMessage)) {
      onSendMessage(sanitizedMessage);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value && onTypingStart) {
      onTypingStart();
    } else if (!e.target.value && onTypingEnd) {
      onTypingEnd();
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message) => (
          <MessageBubble key={message.id} isUser={message.sender === 'user'}>
            <MessageText>{message.text}</MessageText>
            <MessageTime>{formatTimestamp(message.timestamp)}</MessageTime>
          </MessageBubble>
        ))}
        
        {isLoading && (
          <TypingIndicator>
            <span>Mag is typing</span>
            <TypingDots>
              <div />
            </TypingDots>
          </TypingIndicator>
        )}
        
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <InputWrapper>
          <ActionButton>
            <Smile size={20} />
          </ActionButton>
          
          <MessageInput
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          
          <ActionButton>
            <Mic size={20} />
          </ActionButton>
          
          <SendButton
            onClick={handleSendMessage}
            disabled={isLoading || isMessageEmpty(inputValue)}
          >
            <Send size={20} />
          </SendButton>
        </InputWrapper>
      </InputContainer>
    </ChatContainer>
  );
} 