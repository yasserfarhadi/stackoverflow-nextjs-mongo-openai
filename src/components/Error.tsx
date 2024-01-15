import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
  stack?: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
    stack: '',
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      errorMessage: error?.message,
      stack: error?.stack,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <h1>خطایی رخ داده است!</h1>
          <h3
            style={{
              flexBasis: '100%',
              display: 'flex',
              justifyContent: 'center',
              color: 'orange',
            }}
          >
            {this.state.errorMessage}
          </h3>
          <div style={{ border: '1px solid orange' }}>{this.state.stack}</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
