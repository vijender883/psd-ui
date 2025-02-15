// In ErrorDisplay.js, update to handle test case specific errors:

import React from 'react';
import { AlertCircle } from 'lucide-react';
import './ErrorDisplay.css';

const ErrorDisplay = ({ error, isTestCase = false }) => {
  const formatCompilationError = (error) => {
    if (!error) return null;

    if (typeof error === 'string') {
      const lines = error.split('\n');
      return lines.map((line, index) => {
        const isErrorLine = line.includes('error:');
        const isLocationLine = line.match(/\s+at\s+/);
        const hasLineNumber = line.match(/^\s*\^\s*$/);

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

    return <div className="error-line">{JSON.stringify(error)}</div>;
  };

  const formatRuntimeError = (error) => {
    if (typeof error === 'object') {
      return (
        <div className="runtime-error">
          {!isTestCase && <div className="error-title">Runtime Error</div>}
          <div className="error-message">
            {error.message || 'An unknown error occurred'}
          </div>
          {error.stack && !isTestCase && (
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

  if (!error) return null;

  const isCompilationError = typeof error === 'string' && error.includes('error:');
  
  if (isTestCase) {
    return (
      <div className="test-case-error-display">
        <div className="error-content">
          {isCompilationError 
            ? formatCompilationError(error)
            : formatRuntimeError(error)
          }
        </div>
      </div>
    );
  }

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