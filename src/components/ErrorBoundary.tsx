import React, { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

const ErrorContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[900]};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing[8]};
  border: 2px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => theme.spacing[8]};
  text-align: left;
`;

const ErrorTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ErrorDetails = styled.pre`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: ${({ theme }) => theme.fonts.family.mono};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong.</ErrorTitle>
          <p>An unexpected error occurred. Please try refreshing the page.</p>
          {this.state.error && (
            <>
              <ErrorDetails>
                <strong>Error:</strong> {this.state.error.toString()}
              </ErrorDetails>
              <ErrorDetails>
                <strong>Stack Trace:</strong><br/>
                {this.state.errorInfo?.componentStack}
              </ErrorDetails>
            </>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 