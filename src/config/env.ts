export const config = {
  api: {
    key: import.meta.env.VITE_GROQ_API_KEY || '',
    provider: 'Groq',
  },
  app: {
    name: 'Mag - Emotional Anime Companion',
    version: '1.0.0',
    environment: import.meta.env.MODE || 'development',
  },
  features: {
    voiceEnabled: false,
    autoResponse: true,
    emotionDetection: true,
  },
} as const;

export function isDevelopment(): boolean {
  return config.app.environment === 'development';
}

export function isProduction(): boolean {
  return config.app.environment === 'production';
}

export function hasApiKey(): boolean {
  return !!config.api.key;
} 