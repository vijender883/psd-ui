import React from 'react';
import { AlertCircle } from 'lucide-react';

const CompilationError = ({ error }) => {
  // Parse and format the Java compilation error message
  const formatErrorMessage = (errorText) => {
    if (!errorText) return null;
    
    const lines = errorText.split('\n').filter(line => line.trim());
    const errorLine = lines.find(line => line.includes('error:'));
    
    if (!errorLine) return { description: errorText };
    
    const match = errorLine.match(/.*error: (.+)/);
    if (!match) return { description: errorText };
    
    const pointerLine = lines.find(line => line.includes('^'));
    
    return {
      description: match[1].trim(),
      pointerLine: pointerLine?.trim()
    };
  };

  const parsedError = formatErrorMessage(error);

  return (
    <div className="compilation-error-container">
      <div className="error-alert">
        <div className="error-header">
          <AlertCircle className="error-icon" />
          <h3 className="error-title">Compilation Error</h3>
        </div>
        
        <div className="error-content">
          <div className="error-details">
            <p className="error-message">{parsedError.description}</p>
            {parsedError.pointerLine && (
              <div className="pointer-line">{parsedError.pointerLine}</div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .compilation-error-container {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          max-width: 100%;
          word-wrap: break-word;
        }

        .error-alert {
          background-color: #fee2e2;
          border: 1px solid #ef4444;
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-wrap: break-word;
        }

        .error-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .error-icon {
          color: #dc2626;
          width: 1.25rem;
          height: 1.25rem;
          flex-shrink: 0;
        }

        .error-title {
          color: #dc2626;
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }

        .error-content {
          color: #7f1d1d;
        }

        .error-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .error-message {
          font-weight: 500;
          margin: 0;
          word-break: break-word;
          white-space: pre-wrap;
        }

        .pointer-line {
          color: #dc2626;
          font-family: monospace;
          white-space: pre;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
};

export default CompilationError;