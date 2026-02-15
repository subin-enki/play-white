import { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='border-destructive bg-destructive/10 rounded-lg border p-4'>
            <h2 className='text-destructive mb-2 text-lg font-semibold'>Something went wrong</h2>
            <p className='text-muted-foreground text-sm'>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className='bg-primary text-primary-foreground mt-4 rounded-md px-4 py-2 text-sm'
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
