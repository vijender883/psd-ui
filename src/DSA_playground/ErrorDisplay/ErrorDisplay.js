import React from 'react';
import { AlertCircle } from 'lucide-react';
import './ErrorDisplay.css';

const ErrorDisplay = ({ error }) => {
  // Function to format compilation error messages
  const formatCompilationError = (error) => {
    if (!error) return null;

    // Handle string error messages
    if (typeof error === 'string') {
      const lines = error.split('\n');
      return lines.map((line, index) => {
        // Check if line contains error message or line number indicators
        const isErrorLine = line.includes('error:');
        const isLocationLine = line.match(/\s+at\s+/); // Matches stack trace lines
        const hasLineNumber = line.match(/^\s*\^\s*$/); // Matches error pointer lines

        return (
          <div 
            key={index} 
            className={`error-line ${isErrorLine ? 'error-highlight' : ''} 
                      ${isLocationLine ? 'location-line' : ''} 
                      ${hasLineNumber ? 'pointer-line' : ''}`}
          >
            {line}
          </div>
        );
      });
    }

    // Return the raw error if it's not in an expected format
    return <div className="error-line">{JSON.stringify(error)}</div>;
  };

  // Function to format runtime error messages
  const formatRuntimeError = (error) => {
    if (typeof error === 'object') {
      return (
        <div className="runtime-error">
          <div className="error-title">Runtime Error</div>
          <div className="error-message">
            {error.message || 'An unknown error occurred'}
          </div>
          {error.stack && (
            <pre className="error-stack">
              {error.stack.split('\n').map((line, index) => (
                <div key={index} className="stack-line">
                  {line}
                </div>
              ))}
            </pre>
          )}
        </div>
      );
    }
    return <div className="error-message">{String(error)}</div>;
  };

  // If no error is provided
  if (!error) {
    return null;
  }

  // Determine error type and format accordingly
  const isCompilationError = typeof error === 'string' && error.includes('error:');
  
  return (
    <div className="error-display">
      <div className="error-header">
        <AlertCircle className="error-icon" size={20} />
        <span>{isCompilationError ? 'Compilation Error' : 'Runtime Error'}</span>
      </div>
      <div className="error-content">
        {isCompilationError 
          ? formatCompilationError(error)
          : formatRuntimeError(error)
        }
      </div>
    </div>
  );
};

export default ErrorDisplay;