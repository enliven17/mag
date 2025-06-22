import { ChatMessage } from '@/types';
import { CHAT_CONFIG } from '@/constants';

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function createMessage(
  text: string,
  sender: 'user' | 'ai',
  emotion?: string
): ChatMessage {
  return {
    id: generateMessageId(),
    text,
    sender,
    timestamp: new Date(),
    emotion: emotion as any,
  };
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function simulateTyping(text: string, onProgress: (text: string) => void): Promise<void> {
  return new Promise((resolve) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        onProgress(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, CHAT_CONFIG.TYPING_SPEED);
  });
}

export function truncateMessage(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function isMessageEmpty(text: string): boolean {
  return sanitizeInput(text).length === 0;
} 