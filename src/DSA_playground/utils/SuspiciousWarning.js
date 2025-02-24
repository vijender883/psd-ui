import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import './SuspiciousWarning.css'

const SuspiciousWarning = ({
  isSuspicious,
  suspicionReason,
  isComplexityAccurate,
  providedTimeComplexity,
  providedSpaceComplexity,
  actualTimeComplexity,
  actualSpaceComplexity,
  complexityExplanation
}) => {
  if (!isSuspicious && isComplexityAccurate) {
    return null;
  }

  return (
    <div className="suspicious-warning">
      {isSuspicious && (
        <div className="warning-item">
          <AlertTriangle size={20} className="warning-icon" />
          <div className="warning-content">
            <h4>Potential AI-Generated Code</h4>
            <p>{suspicionReason}</p>
          </div>
        </div>
      )}
      
      {!isComplexityAccurate && (
        <div className="complexity-warning">
          <XCircle size={20} className="warning-icon" />
          <div className="warning-content">
            <h4>Complexity Analysis Mismatch</h4>
            <div className="complexity-comparison">
              <div className="complexity-row">
                <span className="complexity-label">Time Complexity:</span>
                <span className="complexity-provided">Provided: {providedTimeComplexity}</span>
                <span className="complexity-actual">Ideal: {actualTimeComplexity}</span>
              </div>
              <div className="complexity-row">
                <span className="complexity-label">Space Complexity:</span>
                <span className="complexity-provided">Provided: {providedSpaceComplexity}</span>
                <span className="complexity-actual">Ideal: {actualSpaceComplexity}</span>
              </div>
            </div>
            {/* <p className="complexity-explanation">{complexityExplanation}</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuspiciousWarning;