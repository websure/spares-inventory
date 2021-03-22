import React, { Component } from 'react';

export const ERROR_TYPES = {
  DEFAULT: 'Something went wrong.We are working on it.Please check with Admin.',
  APP_LEVEL: 'Something went wrong.Please check with Admin',
  COMPONENT_LEVEL: 'Something went wrong.Please try again later',
};

type MyProps = { type: string };
type MyState = { hasError: boolean };

class ErrorBoundary extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): MyState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo): void {
    // log error to an error reporting service
    console.debug('error ', error, errorInfo);
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { children, type } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      // eslint-disable-next-line react/react-in-jsx-scope
      return <h1>{type}</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
