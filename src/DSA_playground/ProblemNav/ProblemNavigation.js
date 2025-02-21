import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ProblemNavigation.css';

const ProblemNavigation = ({
  currentProblem,
  problems,
  onSelectProblem
}) => {
  const currentIndex = problems.findIndex(p => p.id === currentProblem.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < problems.length - 1;

  return (
    <div className="problem-navigation">
      <div className="navigation-container">
        <div className="navigation-content">
          {/* Problem Title and Navigation */}
          <div className="navigation-controls">
            <button
              onClick={() => hasPrevious && onSelectProblem(problems[currentIndex - 1])}
              disabled={!hasPrevious}
              className={`nav-button ${!hasPrevious ? 'disabled' : ''}`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="problem-selector">
              <select
                value={currentProblem.id}
                onChange={(e) => {
                  const problem = problems.find(p => p.id === e.target.value); // Remove parseInt
                  onSelectProblem(problem);
                }}
                className="problem-select"
              >
                {problems.map((problem) => (
                  <option key={problem.id} value={problem.id}>
                    {problem.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => hasNext && onSelectProblem(problems[currentIndex + 1])}
              disabled={!hasNext}
              className={`nav-button ${!hasNext ? 'disabled' : ''}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Problem Stats */}
          <div className="problem-stats">
            <div className="difficulty-indicator">
              <span>Difficulty:</span>
              <span className={`difficulty-badge ${currentProblem.difficulty?.toLowerCase() || 'easy'}`}>
                {currentProblem.difficulty || 'Easy'}
              </span>
            </div>
            <div className="success-rate">
              Success Rate: {currentProblem.successRate || '0'}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemNavigation;