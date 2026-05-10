import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', backgroundColor: '#0f172a', color: '#ef4444', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>🚨 React Runtime Error</h1>
          <p style={{ color: '#f59e0b', fontSize: '16px', marginBottom: '20px' }}>
            {this.state.error && this.state.error.toString()}
          </p>
          <h2 style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '10px' }}>Component Stack Trace:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#94a3b8', backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', overflowX: 'auto' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <p style={{ marginTop: '20px', color: '#64748b' }}>Please share this error message with me so I can fix it immediately!</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
