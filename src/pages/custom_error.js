import Router from 'next/router';

// Add a custom error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error information for debugging purposes
    console.error(error, errorInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hasError !== this.state.hasError && this.state.hasError) {
      // Redirect to a different page when an error occurs
      Router.push('/error');
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>An error occurred.</h1>;
    }

    return this.props.children;
  }
}

// Wrap your components with the custom error boundary
export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
