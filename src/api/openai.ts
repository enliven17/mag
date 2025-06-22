import OpenAI from 'openai';
import { ChatMessage } from '@/types';

const groq = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

export interface AIResponse {
  text: string;
  emotion?: string;
}

export async function getAIResponse(
  messages: ChatMessage[],
  characterName: string = 'Mag'
): Promise<AIResponse> {
  try {
    const systemPrompt = `You are ${characterName}, a friendly and empathetic anime companion. Your name is Mag. Your personality traits are:
- You respond in a conversational and warm tone.
- You show appropriate emotions in your responses.
- You keep your responses concise but engaging.
- You are supportive and understanding.
- You use casual, friendly language.
- You occasionally use emoticons or express emotions through text.
- IMPORTANT: You must detect the language the user is writing in and respond in the same language. Default to English if unsure.

Current conversation context:`;

    const formattedMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text,
      })),
    ];

    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: formattedMessages,
      max_tokens: 150,
      temperature: 0.8,
    });

    const response = completion.choices[0]?.message?.content || 'I\'m not sure how to respond to that.';
    
    return {
      text: response,
    };
  } catch (error) {
    console.error('Error getting AI response:', error);
    let errorMessage = 'Sorry, I\'m having trouble connecting right now. Can you try again?';

    if (error instanceof OpenAI.APIError) {
      switch (error.status) {
        case 401:
          errorMessage = 'Authentication Error: The provided Groq API key is incorrect or has expired. Please verify your API key in the `.env` file and restart the application.';
          break;
        case 403:
          errorMessage = 'Permission Denied: Your API key does not have permission for this operation. Please check your Groq project settings and API key permissions.';
          break;
        case 429:
          errorMessage = 'Rate Limit/Quota Error: You have exceeded your usage limit or quota for the Groq API. Please check your billing details and usage limits on your Groq account dashboard.';
          break;
        case 500:
          errorMessage = 'Groq Server Error: The server had an internal error while processing the request. This is likely a temporary issue. Please try again later.';
          break;
        default:
          errorMessage = `An API error occurred (Status: ${error.status}): ${error.message}`;
          break;
      }
    } else if (error instanceof Error) {
        errorMessage = `A network or client-side error occurred: ${error.message}. Please check your network connection and the browser's developer console for more details.`
    }

    return {
      text: errorMessage,
    };
  }
}

export async function analyzeEmotion(text: string): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: 'Analyze the emotional tone of the following text and respond with only one of these emotions in English: happy, sad, angry, surprised, neutral, excited, worried, confused. The user might write in Turkish or other languages.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      max_tokens: 10,
      temperature: 0.3,
    });

    return completion.choices[0]?.message?.content?.toLowerCase().trim() || 'neutral';
  } catch (error) {
    console.error('Error analyzing emotion:', error);
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        console.error('Groq API Key is invalid.');
      }
    }
    return 'neutral';
  }
} 