import { Component } from "react";
import PropTypes from "prop-types";

/**
 * Error Boundary component to catch and handle React errors gracefully
 * Prevents the entire app from crashing when a component throws an error
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              width: "100%",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "1.5rem",
              padding: "2rem",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                marginBottom: "1rem",
              }}
            >
              😵
            </div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Oops! Something went wrong
            </h1>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                marginBottom: "2rem",
                fontSize: "1rem",
              }}
            >
              We encountered an unexpected error. Please try reloading the page.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <details
                style={{
                  marginBottom: "2rem",
                  textAlign: "left",
                  background: "rgba(0, 0, 0, 0.3)",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#fca5a5",
                }}
              >
                <summary style={{ cursor: "pointer", marginBottom: "0.5rem" }}>
                  Error Details
                </summary>
                <pre
                  style={{
                    overflowX: "auto",
                    fontSize: "0.75rem",
                    color: "#fecaca",
                  }}
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "white",
                background: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "0.75rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
