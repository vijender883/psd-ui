import React, { useState, useEffect } from 'react';
import { Plus, Save, Trash2, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './AdminProblemManager.css';

const AdminProblemManager = () => {
  const [problem, setProblem] = useState({
    title: '',
    description: '',
    inputFormat: '',
    outputFormat: '',
    functionName: 'MinFinder',  // Default function name
    functionTemplate: `public class MinFinder {
      public int findMin(int[] arr) {
          // Write your code here
      }
  }`,
    example: {
      input: '',
      output: ''
    },
    testCases: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showTestCases, setShowTestCases] = useState(true);

  const fetchProblem = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/code/problems');
      const data = await response.json();
      if (data.length > 0) {
        setProblem(data[data.length - 1]); // Just getting the first problem for now
      }
    } catch (error) {
      console.error('Error fetching problem:', error);
    }
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Basic validation
      if (!problem.title || !problem.functionName || !problem.functionTemplate) {
        setMessage({ type: 'error', text: 'Please fill in all required fields' });
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3001/api/code/problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(problem)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Problem saved successfully!' });
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.message || 'Failed to save problem' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving problem: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const addTestCase = () => {
    setProblem(prev => ({
      ...prev,
      testCases: [...prev.testCases, {
        input: [],
        expectedOutput: '',
        description: ''
      }]
    }));
  };

  const removeTestCase = (index) => {
    setProblem(prev => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== index)
    }));
  };

  const updateTestCase = (index, field, value) => {
    setProblem(prev => ({
      ...prev,
      testCases: prev.testCases.map((testCase, i) => {
        if (i === index) {
          if (field === 'input') {
            try {
              // Try to parse as array if it contains commas
              if (value.includes(',')) {
                const inputArray = value.split(',').map(item => {
                  item = item.trim();
                  // Try to convert to number if possible
                  const num = Number(item);
                  return !isNaN(num) ? num : item;
                });
                return { ...testCase, input: inputArray };
              } else {
                // Single value input
                const num = Number(value);
                const input = !isNaN(num) ? num : value;
                return { ...testCase, input: [input] };
              }
            } catch (error) {
              console.error('Error parsing input:', error);
              return testCase;
            }
          }

          if (field === 'expectedOutput') {
            try {
              // Try to convert to number if possible
              const num = Number(value);
              const output = !isNaN(num) ? num : value;
              return { ...testCase, expectedOutput: output };
            } catch (error) {
              return { ...testCase, expectedOutput: value };
            }
          }

          return { ...testCase, [field]: value };
        }
        return testCase;
      })
    }));
  };


  return (
    <div className="admin-problem-container">
      <div className="admin-content">
        <h1>Problem Management</h1>

        {message && (
          <div className={`message ${message.type}`}>
            {message.type === 'error' ? (
              <AlertCircle size={20} />
            ) : (
              <CheckCircle size={20} />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="form-section">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={problem.title}
              onChange={(e) => setProblem(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={problem.description}
              onChange={(e) => setProblem(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Input Format</label>
              <textarea
                value={problem.inputFormat}
                onChange={(e) => setProblem(prev => ({ ...prev, inputFormat: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label>Output Format</label>
              <textarea
                value={problem.outputFormat}
                onChange={(e) => setProblem(prev => ({ ...prev, outputFormat: e.target.value }))}
              />
            </div>
          </div>



          <div className="form-row">
            <div className="form-group">
              <label>Function Name</label>
              <input
                type="text"
                value={problem.functionName}
                onChange={(e) => setProblem(prev => ({ ...prev, functionName: e.target.value }))}
                placeholder="e.g., MinFinder"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Function Template</label>
            <textarea
              value={problem.functionTemplate}
              onChange={(e) => setProblem(prev => ({ ...prev, functionTemplate: e.target.value }))}
              placeholder="public class ClassName {..."
              rows={6}
            />
          </div>

          <div className="example-section">
            <h3>Example</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Input</label>
                <input
                  type="text"
                  value={problem.example.input}
                  onChange={(e) => setProblem(prev => ({
                    ...prev,
                    example: { ...prev.example, input: e.target.value }
                  }))}
                />
              </div>
              <div className="form-group">
                <label>Output</label>
                <input
                  type="text"
                  value={problem.example.output}
                  onChange={(e) => setProblem(prev => ({
                    ...prev,
                    example: { ...prev.example, output: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>

          <div className="test-cases-section">
            <div className="test-cases-header" onClick={() => setShowTestCases(!showTestCases)}>
              <h3>Test Cases</h3>
              <div className="header-actions">
                <button className="add-button" onClick={(e) => {
                  e.stopPropagation();
                  addTestCase();
                }}>
                  <Plus size={16} />
                  Add Test Case
                </button>
                {showTestCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {showTestCases && (
              <div className="test-cases-list">
                {problem.testCases.map((testCase, index) => (
                  <div key={index} className="test-case">
                    <button
                      className="remove-button"
                      onClick={() => removeTestCase(index)}
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Input Array</label>
                        <input
                          type="text"
                          value={Array.isArray(testCase.input) ? testCase.input.join(', ') : testCase.input}
                          onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                          placeholder="Values (comma-separated for arrays)"
                        />
                      </div>
                      <div className="form-group">
                        <label>Expected Output</label>
                        <input
                          type="text"
                          value={testCase.expectedOutput}
                          onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                          placeholder="Expected output (any type)"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <input
                        type="text"
                        value={testCase.description}
                        onChange={(e) => updateTestCase(index, 'description', e.target.value)}
                        placeholder="Describe this test case"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              className={`save-button ${loading ? 'loading' : ''}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              <Save size={16} />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProblemManager;