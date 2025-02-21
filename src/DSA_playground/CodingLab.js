import React, { useState, useEffect } from 'react';
import { Clock, Play, ChevronUp, ChevronDown, CheckCircle, XCircle, X, Eye } from 'lucide-react';
import './CodingLab.css';
import Celebration from './Celebration/Celebration';
import CalculateScore from './utils/CalculateScore';
import ProblemNavigation from './ProblemNav/ProblemNavigation';
import MonacoCodeEditor from './CodeEditor/MonacoCodeEditor';
import ErrorDisplay from './ErrorDisplay/ErrorDisplay';


const CodingLab = () => {
  const [code, setCode] = useState('class MinFinder {\n    public int findMin(int[] arr) {\n        // Write your code here\n    }\n}');
  const [results, setResults] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [customTestCases, setCustomTestCases] = useState([]);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [compilationError, setCompilationError] = useState(null);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [problem, setProblem] = useState({
    title: '',
    description: '',
    inputFormat: '',
    outputFormat: '',
    example: { input: '', output: '' },
    functionTemplate: ''
  });

  const [problems, setProblems] = useState([]);
  const [showingSolution, setShowingSolution] = useState(false);

  const renderSolutionSection = () => {
    if (!problem.showSolution) return null;

    return (
      <div className="solution-section">
        <div className="solution-header">
          <h3>Solution</h3>
          <button
            className="solution-toggle"
            onClick={() => setShowingSolution(!showingSolution)}
          >
            <Eye size={16} />
            <span>{showingSolution ? 'Hide Solution' : 'View Solution'}</span>
          </button>
        </div>

        {showingSolution && (
          <div className="solution-content">
            <div className="solution-explanation">
              <p>Here's an efficient solution to this problem:</p>
            </div>
            <div className="solution-code-container">
              <pre className="solution-code">
                <code>{problem.solution}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/code/problems`);
        const data = await response.json();
        if (data.length > 0) {
          setProblems(data);
          setProblem(data[0]); // Set initial problem
          setCode(data[0].functionTemplate);
        }
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  // submissions list to show scores:
  submissions.map((submission) => (
    <div key={submission.id} className="submission-item">
      <div className="submission-header">
        <span className="submission-id">#{submission.id}</span>
        <span className="submission-time">
          {new Date(submission.timestamp).toLocaleString()}
        </span>
      </div>
      <div className="submission-info">
        <span className="test-stats">
          Score: {submission.score}/100
        </span>
        <span className="test-stats">
          {submission.passedTests}/{submission.totalTests} tests passed
        </span>
        <span className="execution-time">
          {submission.executionTime.toFixed(3)}ms
        </span>
      </div>
    </div>
  ))

  const renderConstraints = () => {
    if (!problem.constraints || problem.constraints.length === 0) {
      return null;
    }

    return (
      <>
        <h3>Constraints</h3>
        <ul className="constraints-list">
          {problem.constraints.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
      </>
    );
  };


  const handleSubmit = async () => {
    if (!username.trim()) {
      setUsernameError('Please enter a username');
      return;
    }
    setUsernameError('');

    setIsLoading(true);
    setCompilationError(null);
    setShowResults(false);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/code/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          code,
          problemId: problem.id,
          username: username.trim()
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setCompilationError(data.error);
        setResults({
          results: [],
          error: data.error
        });
        setShowResults(true);
        return;
      }

      setResults(data);
      setShowResults(true);

      // Calculate summary from results array
      const totalTests = data.results.length;
      const passedTests = data.results.filter(result => result.passed).length;
      const averageExecutionTime = data.results.reduce((sum, result) => sum + result.executionTime, 0) / totalTests;
      const score = (passedTests / totalTests) * 100;
      
      const newSubmission = {
        id: submissions.length + 1,
        timestamp: new Date().toISOString(),
        executionTime: averageExecutionTime,
        passedTests: passedTests,
        totalTests: totalTests,
        score: score,
        username: username
      };

      setSubmissions([newSubmission, ...submissions]);

      if (score === 100) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    } catch (error) {
      setShowResults(true);
      setCompilationError({
        message: 'An error occurred while running your code',
        stack: error.message
      });
      console.error('Error submitting code:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const handleKeyPress = (e) => {
  //     // Check for Ctrl+Enter or Cmd+Enter
  //     if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isLoading) {
  //       handleSubmit();
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyPress);
  //   return () => document.removeEventListener('keydown', handleKeyPress);
  // }, [isLoading]);


  const handleProblemSelect = (selectedProblem) => {
    console.log('Selected Problem:', selectedProblem); // Add this
    if (!selectedProblem) {
      console.error('Selected problem is undefined');
      return;
    }
    setProblem(selectedProblem);
    setCode(selectedProblem.functionTemplate);
    // Reset states for new problem
    setResults(null);
    setSubmissions([]);
    setCustomTestCases([]);
    setShowResults(false);
    setCompilationError(null);
  };

  return (
    <div className="coding-lab-wrapper">
      <ProblemNavigation
        currentProblem={problem}
        problems={problems}
        onSelectProblem={handleProblemSelect}
      />
      <div className="coding-lab-container">
        <div className="split-view">
          {/* Problem Statement Panel */}
          <div className="problem-panel">
            <div className="problem-content">
              <h2>{problem.title}</h2>
              <div className="problem-description">
                <h3>Problem Description</h3>
                <p dangerouslySetInnerHTML={{ __html: problem.description }}></p>

                <h3>Input Format</h3>
                <p>{problem.inputFormat}</p>

                <h3>Output Format</h3>
                <p>{problem.outputFormat}</p>

                {renderConstraints()}

                <h3>Example</h3>
                <pre className="test-case">
                  Input: {problem.example.input} <br></br>
                  Output: {problem.example.output}
                </pre>

              </div>

              {/* {renderSolutionSection()} */}
            </div>

            {/* Results Overlay */}

            {showResults && (
              <div className="results-overlay">
                <button
                  className="close-results"
                  onClick={() => setShowResults(false)}
                >
                  <X size={24} />
                </button>
                {compilationError ? (
                  <div className="compilation-error-container">
                    <ErrorDisplay error={compilationError} />
                  </div>
                ) : (
                  <>
                    <div className="score-display">
                      Score: {CalculateScore(results)}/100
                    </div>
                    <h3>Test Results</h3>
                  </>)}
                <div className="test-results">
                  {results?.results?.map((result, index) => (
                    <div
                      key={index}
                      className={`test-result ${result.passed ? 'passed' : 'failed'}`}
                    >
                      <div className="test-result-header">
                        {result.passed ? (
                          <CheckCircle className="passed-icon" />
                        ) : (
                          <XCircle className="failed-icon" />
                        )}
                        <span className="test-case-title">Test Case {result.testCase}</span>
                      </div>
                      <p className="test-case-description">{result.description}</p>
                      <div className="test-result-details">
                        <p>Input: {result.input}</p>
                        <p>Expected: {result.expectedOutput}</p>
                        {result.error ? (
                          <div className="test-case-error">
                            <ErrorDisplay error={result.error} isTestCase={true} />
                          </div>
                        ) : (
                          <>
                            <p>Your Output: {result.yourOutput}</p>
                            <p className="execution-time">
                              Time: {result.executionTime.toFixed(3)}ms
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* Code Editor Panel */}
          <div className="editor-panel">
            <div className="username-input-container">
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError('');
                }}
                placeholder="Enter your username"
                className={`username-input ${usernameError ? 'error' : ''}`}
              />
              {usernameError && <span className="error-message">{usernameError}</span>}
            </div>
            <div className="code-editor">
              <MonacoCodeEditor
                value={code}
                onChange={(newValue) => setCode(newValue)}
                language="java"
                onSubmit={handleSubmit}
              />
            </div>

            <div className="submit-button-container">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="submit-button"
              >
                {isLoading ? (
                  <>
                    <Clock className="animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>

            <div className="submissions-panel">
              <button
                onClick={() => setShowSubmissions(!showSubmissions)}
                className="submissions-toggle"
              >
                <span>Previous Submissions</span>
                {showSubmissions ? <ChevronDown /> : <ChevronUp />}
              </button>
              {showSubmissions && (
                <div className="submissions-list">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="submission-item">
                      <div className="submission-header">
                        <span className="submission-id">#{submission.id}</span>
                        <span className="submission-time">
                          {new Date(submission.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="submission-info">
                        <span className="test-stats">
                          {submission.passedTests}/{submission.totalTests} tests passed
                        </span>
                        <span className="execution-time">
                          {submission.executionTime.toFixed(3)}ms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {showCelebration && <Celebration />}
      </div>
    </div>
  );
};

export default CodingLab;