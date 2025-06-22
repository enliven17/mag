import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '@/store';
import { theme } from '@/theme';
import { ChatScreen } from '@/screens/ChatScreen';
import { GlobalStyles } from '@/components/GlobalStyles';
import ErrorBoundary from '@/components/ErrorBoundary';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ErrorBoundary>
          <ChatScreen />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 