import { EmotionType, EmotionAnalysis } from '@/types';
import { EMOTION_KEYWORDS } from '@/constants';

export function detectEmotion(text: string): EmotionAnalysis {
  const lowerText = text.toLowerCase();
  
  const emotionScores: Record<EmotionType, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    surprised: 0,
    neutral: 0,
    excited: 0,
    worried: 0,
    confused: 0,
  };

  // Count emotion keywords
  Object.entries(EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        emotionScores[emotion as EmotionType] += 1;
      }
    });
  });

  // Additional sentiment analysis
  const positiveWords = ['good', 'great', 'awesome', 'wonderful', 'amazing', 'love', 'like', 'enjoy'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'horrible', 'worst'];
  const exclamationCount = (text.match(/!/g) || []).length;
  const questionCount = (text.match(/\?/g) || []).length;

  // Boost scores based on punctuation and context
  if (exclamationCount > 0) {
    emotionScores.excited += exclamationCount * 0.5;
    emotionScores.happy += exclamationCount * 0.3;
  }

  if (questionCount > 0) {
    emotionScores.confused += questionCount * 0.5;
    emotionScores.surprised += questionCount * 0.3;
  }

  positiveWords.forEach(word => {
    if (lowerText.includes(word)) {
      emotionScores.happy += 0.5;
    }
  });

  negativeWords.forEach(word => {
    if (lowerText.includes(word)) {
      emotionScores.sad += 0.5;
      emotionScores.angry += 0.3;
    }
  });

  // Find the emotion with the highest score
  const primaryEmotion = Object.entries(emotionScores).reduce((a, b) => 
    emotionScores[a[0] as EmotionType] > emotionScores[b[0] as EmotionType] ? a : b
  )[0] as EmotionType;

  const maxScore = Math.max(...Object.values(emotionScores));
  const totalScore = Object.values(emotionScores).reduce((sum, score) => sum + score, 0);
  
  const confidence = totalScore > 0 ? maxScore / totalScore : 0.5;
  const intensity = Math.min(maxScore / 3, 1); // Normalize intensity to 0-1

  return {
    primaryEmotion: maxScore > 0 ? primaryEmotion : 'neutral',
    confidence,
    intensity,
  };
}

export function getEmotionIntensity(_emotion: EmotionType, intensity: number): string {
  if (intensity < 0.3) return 'subtle';
  if (intensity < 0.6) return 'moderate';
  return 'intense';
}

export function shouldTriggerAnimation(emotion: EmotionType, confidence: number): boolean {
  return confidence > 0.3 && emotion !== 'neutral';
} 