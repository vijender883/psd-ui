import React, { useState, useEffect } from 'react';
import { Clock, Play, Plus, ChevronUp, ChevronDown, CheckCircle, XCircle, X } from 'lucide-react';
import './CodingLab.css';
import Celebration from './Celebration/Celebration';
import CalculateScore from './utils/CalculateScore';
import CompilationError from './utils/CompilationError';

const CodingLab = () => {
  const [code, setCode] = useState('class MinFinder {\n    public int findMin(int[] arr) {\n        // Write your code here\n    }\n}');
  const [results, setResults] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [customTestCases, setCustomTestCases] = useState([]);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newTestCase, setNewTestCase] = useState({ input: '', expectedOutput: '' });
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [compilationError, setCompilationError] = useState(null);


  const getIndentation = (line) => {
    const match = line.match(/^\s*/);
    return match ? match[0] : '';
  };

  const MATCHING_BRACKETS = {
    '(': ')',
    '{': '}',
    '[': ']',
    '"': '"',
    "'": "'",
    '`': '`'
  };

  const AUTO_CLOSE_CHARS = Object.keys(MATCHING_BRACKETS);

  const handleKeyDown = (e) => {
    const textarea = e.target;
    const { value, selectionStart, selectionEnd } = textarea;

    // Handle Tab key
    if (e.key === 'Tab') {
      e.preventDefault();

      // Insert tab at cursor position or for selected text
      const before = value.substring(0, selectionStart);
      const after = value.substring(selectionEnd);
      const spaces = '    '; // 4 spaces for tab

      // If there's selected text, indent/unindent multiple lines
      if (selectionStart !== selectionEnd) {
        const selectedText = value.substring(selectionStart, selectionEnd);
        const lines = selectedText.split('\n');

        if (e.shiftKey) {
          // Unindent
          const modifiedLines = lines.map(line => {
            if (line.startsWith('    ')) return line.substring(4);
            if (line.startsWith('\t')) return line.substring(1);
            return line;
          });
          const newText = modifiedLines.join('\n');
          textarea.value = before + newText + after;
          textarea.selectionStart = selectionStart;
          textarea.selectionEnd = selectionStart + newText.length;
        } else {
          // Indent
          const modifiedLines = lines.map(line => spaces + line);
          const newText = modifiedLines.join('\n');
          textarea.value = before + newText + after;
          textarea.selectionStart = selectionStart;
          textarea.selectionEnd = selectionStart + newText.length;
        }
      } else {
        // No selection, just insert tab at cursor
        textarea.value = before + spaces + after;
        textarea.selectionStart = textarea.selectionEnd = selectionStart + spaces.length;
      }

      setCode(textarea.value);
      return;
    }

    // Handle Enter key for auto-indentation
    if (e.key === 'Enter') {
      e.preventDefault();

      const lines = value.substring(0, selectionStart).split('\n');
      const currentLine = lines[lines.length - 1];
      const indentation = getIndentation(currentLine);

      // Add extra indentation if the line ends with an opening brace
      const extraIndent = currentLine.trimEnd().endsWith('{') ? '    ' : '';

      // Insert new line with proper indentation
      const newValue =
        value.substring(0, selectionStart) +
        '\n' + indentation + extraIndent +
        value.substring(selectionEnd);

      textarea.value = newValue;
      const newPosition = selectionStart + 1 + indentation.length + extraIndent.length;
      textarea.selectionStart = textarea.selectionEnd = newPosition;

      setCode(textarea.value);
      return;
    }

    // Handle auto-closing brackets
    if (AUTO_CLOSE_CHARS.includes(e.key)) {
      e.preventDefault();

      const closingChar = MATCHING_BRACKETS[e.key];
      const nextChar = value.charAt(selectionEnd);
      const hasSelection = selectionStart !== selectionEnd;

      if (hasSelection) {
        // Wrap selection with brackets
        const selectedText = value.substring(selectionStart, selectionEnd);
        const newText = e.key + selectedText + closingChar;
        const newValue = value.substring(0, selectionStart) + newText + value.substring(selectionEnd);

        textarea.value = newValue;
        textarea.selectionStart = selectionStart + 1;
        textarea.selectionEnd = selectionEnd + 1;
        setCode(textarea.value);
        return;
      }

      // Handle regular bracket insertion
      const before = value.substring(0, selectionStart);
      const after = value.substring(selectionEnd);

      // Don't auto-close if it would create a double quote
      if ((e.key === '"' || e.key === "'" || e.key === '`') && nextChar === e.key) {
        // Just move cursor past the existing quote
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
        return;
      }

      textarea.value = before + e.key + closingChar + after;
      textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
      setCode(textarea.value);
      return;
    }

    // Handle backspace to remove pairs
    if (e.key === 'Backspace' && !e.ctrlKey && !e.metaKey) {
      const currentChar = value.charAt(selectionStart - 1);
      const nextChar = value.charAt(selectionStart);

      if (AUTO_CLOSE_CHARS.includes(currentChar) &&
        nextChar === MATCHING_BRACKETS[currentChar] &&
        selectionStart === selectionEnd) {
        e.preventDefault();
        const newValue = value.substring(0, selectionStart - 1) + value.substring(selectionStart + 1);
        textarea.value = newValue;
        textarea.selectionStart = textarea.selectionEnd = selectionStart - 1;
        setCode(textarea.value);
        return;
      }
    }

    // Handle closing bracket/quote skip
    if (Object.values(MATCHING_BRACKETS).includes(e.key)) {
      const nextChar = value.charAt(selectionStart);
      if (nextChar === e.key && selectionStart === selectionEnd) {
        e.preventDefault();
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
        return;
      }
    }
  };



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

  const handleSubmit = async () => {
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
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.error && data.error.includes('error: ')) {
        setCompilationError(data.error);
        setShowResults(true);
        return;
      }

      const score = CalculateScore(data);
      setResults(data);
      setShowResults(true);

      if (data.success) {
        const newSubmission = {
          id: submissions.length + 1,
          timestamp: new Date().toISOString(),
          executionTime: data.summary.averageExecutionTime,
          passedTests: data.summary.passedTests,
          totalTests: data.summary.totalTests,
          score: score
        };
        setSubmissions([newSubmission, ...submissions]);

        // Show celebration for perfect score
        if (score === 100) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }
      }
    } catch (error) {
      setShowResults(true);
      console.error('Error submitting code:', error);
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check for Ctrl+Enter or Cmd+Enter
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isLoading) {
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isLoading]);


  const addCustomTestCase = () => {
    if (newTestCase.input && newTestCase.expectedOutput) {
      setCustomTestCases([...customTestCases, {
        id: customTestCases.length + 1,
        ...newTestCase
      }]);
      setNewTestCase({ input: '', expectedOutput: '' });
    }
  };

  return (
    <div className="coding-lab-container">
      <div className="split-view">
        {/* Problem Statement Panel */}
        <div className="problem-panel">
          <div className="problem-content">
            <h2>Find Minimum Element</h2>
            <div className="problem-description">
              <h3>Problem Description</h3>
              <p>Given an array of integers, write a function to find the minimum element in the array.</p>

              <h3>Input Format</h3>
              <p>An array of integers arr where 1 ≤ arr.length ≤ 105</p>

              <h3>Output Format</h3>
              <p>Return the minimum element in the array</p>

              <h3>Example</h3>
              <pre className="test-case">
                Input: [64, 34, 25, 12, 22, 11, 90]
                Output: 11
              </pre>

              <div className="test-cases">
                <h3>Custom Test Cases</h3>
                {customTestCases.map((testCase) => (
                  <div key={testCase.id} className="test-case">
                    <p>Input: {testCase.input}</p>
                    <p>Expected Output: {testCase.expectedOutput}</p>
                  </div>
                ))}

                <div className="test-case-inputs">
                  <input
                    type="text"
                    placeholder="Input (comma-separated)"
                    value={newTestCase.input}
                    onChange={(e) => setNewTestCase({ ...newTestCase, input: e.target.value })}
                    className="test-case-input"
                  />
                  <input
                    type="text"
                    placeholder="Expected Output"
                    value={newTestCase.expectedOutput}
                    onChange={(e) => setNewTestCase({ ...newTestCase, expectedOutput: e.target.value })}
                    className="test-case-input"
                  />
                  <button onClick={addCustomTestCase} className="add-test-case-button">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
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
                <CompilationError error={compilationError} />
              ) : (
                <>
                  <div className="score-display">
                    Score: {CalculateScore(results)}/100
                  </div>
                  <h3>Test Results</h3>
                  <div className="test-results">
                    {results.results?.map((result, index) => (
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
                          <p>Your Output: {result.yourOutput}</p>
                          <p className="execution-time">Time: {result.executionTime.toFixed(2)}ms</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>)}
            </div>
          )}
        </div>

        {/* Code Editor Panel */}
        <div className="editor-panel">
          <div className="code-editor">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck="false"
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
                  <span>Submit (Ctrl+Enter)</span>
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
                        {submission.executionTime.toFixed(2)}ms
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
  );
};

export default CodingLab;