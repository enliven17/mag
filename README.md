# Mag - Emotional Anime Companion

An interactive web application featuring a 3D anime girl character that responds to user emotions through chat conversations. The character displays different facial expressions and animations based on the emotional tone of the conversation.

## Features

- **Emotional AI Companion**: Chat with Mag, an anime character that responds to your emotions
- **Real-time Emotion Detection**: Analyzes text to detect emotions like happy, sad, angry, surprised, etc.
- **Dynamic Character Animations**: Character changes appearance and animations based on detected emotions
- **AI-Powered Responses**: Uses OpenAI GPT for intelligent conversation (with fallback responses)
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Customizable Character**: Adjust hair color, eye color, and outfit preferences

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Styled Components
- **State Management**: Redux Toolkit
- **Build Tool**: Vite
- **AI Integration**: OpenAI GPT-3.5
- **Icons**: Lucide React
- **Animations**: CSS Keyframes + Framer Motion

## Project Structure

```
src/
├── api/             # API clients and calls
├── assets/          # Images, fonts, animations
├── components/      # Reusable UI components
├── config/          # Environment variables and configuration
├── constants/       # App-wide constants
├── hooks/           # Custom React hooks
├── navigation/      # React Navigation logic
├── screens/         # Screen components
├── store/           # Redux Toolkit state management
├── theme/           # Styling and theme
├── types/           # Global TypeScript types
└── utils/           # Helper functions
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mag-emotional-anime-companion
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key (optional):
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

### Basic Chat
- Type messages in the chat input
- The character will respond based on your message content
- Emotions are detected automatically from your text

### Emotion Detection
The app detects emotions from keywords and context:
- **Happy**: "I'm happy", "great", "wonderful", "love"
- **Sad**: "I'm sad", "sorry", "miss", "hurt"
- **Angry**: "angry", "mad", "hate", "frustrated"
- **Surprised**: "wow", "amazing", "unexpected"
- **Excited**: "excited", "thrilled", "pumped"
- **Worried**: "worried", "anxious", "scared"
- **Confused**: "confused", "unsure", "what"

### Character Customization
- Adjust character appearance in the settings
- Change hair color, eye color, and outfit
- Preferences are saved automatically

## API Integration

### OpenAI (Optional)
- Set `VITE_OPENAI_API_KEY` for AI-powered responses
- Uses GPT-3.5-turbo for conversation
- Falls back to predefined responses if no API key

### Fallback Mode
- Works without OpenAI API key
- Uses intelligent keyword matching
- Provides engaging conversation experience

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Style
- Follows TypeScript strict mode
- Uses absolute imports with `@/` prefix
- Styled Components for all styling
- Redux Toolkit for state management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- OpenAI for AI capabilities
- React and Vite communities
- Anime character design inspiration 