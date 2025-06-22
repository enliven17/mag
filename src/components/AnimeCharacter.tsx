import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { EmotionType } from '@/types';

interface AnimeCharacterProps {
  emotion: EmotionType;
  isAnimating: boolean;
  appearance: {
    hairColor: string;
    eyeColor: string;
    outfit: string;
  };
  onAnimationComplete?: () => void;
}

// Animation keyframes
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
`;

const CharacterContainer = styled.div<{ emotion: EmotionType; isAnimating: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  animation: ${({ emotion, isAnimating }) => {
    if (!isAnimating) {
      return 'none';
    }

    switch (emotion) {
      case 'happy':
      case 'excited':
        return css`${bounce} 1s ease-in-out infinite`;
      case 'angry':
        return css`${shake} 0.5s ease-in-out infinite`;
      case 'surprised':
        return css`${pulse} 0.8s ease-in-out infinite`;
      case 'confused':
        return css`${wiggle} 1.2s ease-in-out infinite`;
      default:
        return 'none';
    }
  }};
`;

const Character = styled.div<{ emotion: EmotionType }>`
  width: 200px;
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  
  filter: ${({ emotion }) => {
    switch (emotion) {
      case 'sad':
        return 'brightness(0.8) saturate(0.7)';
      case 'angry':
        return 'brightness(1.2) saturate(1.3) hue-rotate(10deg)';
      case 'excited':
        return 'brightness(1.1) saturate(1.2)';
      default:
        return 'none';
    }
  }};
`;

const Head = styled.div<{ emotion: EmotionType }>`
  width: 80px;
  height: 80px;
  background: ${({ emotion }) => {
    switch (emotion) {
      case 'happy':
      case 'excited':
        return '#FFD700';
      case 'sad':
        return '#87CEEB';
      case 'angry':
        return '#FF4500';
      case 'surprised':
        return '#FF69B4';
      case 'worried':
        return '#DDA0DD';
      case 'confused':
        return '#F0E68C';
      default:
        return '#E6E6FA';
    }
  }};
  border-radius: 50%;
  position: relative;
  margin-bottom: 10px;
  transition: all 0.3s ease;
`;

const Hair = styled.div<{ color: string }>`
  width: 90px;
  height: 40px;
  background: ${({ color }) => color};
  border-radius: 50px 50px 0 0;
  position: absolute;
  top: -20px;
  left: -5px;
`;

const Eyes = styled.div<{ color: string; emotion: EmotionType }>`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  
  &::before,
  &::after {
    content: '';
    width: 12px;
    height: 12px;
    background: ${({ color }) => color};
    border-radius: 50%;
    position: relative;
  }
  
  &::before {
    transform: ${({ emotion }) => {
      switch (emotion) {
        case 'sad':
          return 'translateY(2px)';
        case 'angry':
          return 'translateY(-1px) rotate(-5deg)';
        case 'surprised':
          return 'scale(1.2)';
        default:
          return 'none';
      }
    }};
  }
  
  &::after {
    transform: ${({ emotion }) => {
      switch (emotion) {
        case 'sad':
          return 'translateY(2px)';
        case 'angry':
          return 'translateY(-1px) rotate(5deg)';
        case 'surprised':
          return 'scale(1.2)';
        default:
          return 'none';
      }
    }};
  }
`;

const Mouth = styled.div<{ emotion: EmotionType }>`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: ${({ emotion }) => {
    switch (emotion) {
      case 'happy':
      case 'excited':
        return '20px';
      case 'sad':
        return '15px';
      case 'surprised':
        return '25px';
      default:
        return '18px';
    }
  }};
  height: ${({ emotion }) => {
    switch (emotion) {
      case 'happy':
      case 'excited':
        return '8px';
      case 'sad':
        return '3px';
      case 'surprised':
        return '15px';
      default:
        return '5px';
    }
  }};
  background: #333;
  border-radius: ${({ emotion }) => {
    switch (emotion) {
      case 'happy':
      case 'excited':
        return '0 0 20px 20px';
      case 'sad':
        return '20px 20px 0 0';
      case 'surprised':
        return '50%';
      default:
        return '10px';
    }
  }};
`;

const Body = styled.div<{ emotion: EmotionType }>`
  width: 60px;
  height: 120px;
  background: ${({ emotion }) => {
    switch (emotion) {
      case 'happy':
      case 'excited':
        return '#FFA500';
      case 'sad':
        return '#4682B4';
      case 'angry':
        return '#DC143C';
      case 'surprised':
        return '#FF1493';
      case 'worried':
        return '#9370DB';
      case 'confused':
        return '#DAA520';
      default:
        return '#D8BFD8';
    }
  }};
  border-radius: 30px;
  position: relative;
`;

const Arms = styled.div`
  position: absolute;
  top: 20px;
  left: -15px;
  width: 90px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  
  &::before,
  &::after {
    content: '';
    width: 15px;
    height: 60px;
    background: inherit;
    border-radius: 10px;
  }
`;

const Legs = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  
  &::before,
  &::after {
    content: '';
    width: 20px;
    height: 40px;
    background: inherit;
    border-radius: 10px;
  }
`;

const EmotionLabel = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
`;

export function AnimeCharacter({ 
  emotion, 
  isAnimating, 
  appearance
}: AnimeCharacterProps) {
  return (
    <CharacterContainer emotion={emotion} isAnimating={isAnimating}>
      <EmotionLabel>{emotion}</EmotionLabel>
      <Character emotion={emotion}>
        <Head emotion={emotion}>
          <Hair color={appearance.hairColor} />
          <Eyes color={appearance.eyeColor} emotion={emotion} />
          <Mouth emotion={emotion} />
        </Head>
        <Body emotion={emotion}>
          <Arms />
          <Legs />
        </Body>
      </Character>
    </CharacterContainer>
  );
} 