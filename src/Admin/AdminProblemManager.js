import React, { useState, useEffect } from 'react';
import { Plus, Save, Trash2, AlertCircle, CheckCircle, ChevronDown, ChevronUp, List, Edit2 } from 'lucide-react';
import './AdminProblemManager.css';

const AdminProblemManager = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showProblemList, setShowProblemList] = useState(false);
  const [problem, setProblem] = useState({
    title: '',
    description: '',
    inputFormat: '',
    outputFormat: '',
    constraints: [], // Add this new field
    functionName: 'MinFinder',
    functionTemplate: `public class MinFinder {
      public int findMin(int[] arr) {
          // Write your code here
      }
  }`,
    example: {
      input: '',
      output: ''
    },
    testCases: [],
    showSolution: false,
    solution: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showTestCases, setShowTestCases] = useState(true);

  const fetchProblems = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/code/problems`);
      const data = await response.json();
      setProblems(data);
    } catch (error) {
      console.error('Error fetching problems:', error);
      setMessage({ type: 'error', text: 'Error fetching problems' });
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validate required fields
      if (!problem.title || !problem.functionName || !problem.functionTemplate) {
        setMessage({ type: 'error', text: 'Please fill in all required fields' });
        setLoading(false);
        return;
      }

      const url = selectedProblem
        ? `${process.env.REACT_APP_API_URL}/api/code/problem/${selectedProblem.id}`
        : `${process.env.REACT_APP_API_URL}/api/code/problem`;

      const method = selectedProblem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(problem)
      });

      // Check if response is OK and has content
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || errorJson.message;
        } catch (e) {
          errorMessage = errorText;
        }
        throw new Error(errorMessage || `Failed to ${selectedProblem ? 'update' : 'save'} problem`);
      }

      const data = await response.json();

      setMessage({ type: 'success', text: `Problem ${selectedProblem ? 'updated' : 'saved'} successfully!` });
      await fetchProblems();

      if (!selectedProblem) {
        resetForm();
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage({
        type: 'error',
        text: `Error ${selectedProblem ? 'updating' : 'saving'} problem: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (problemId) => {
    if (!window.confirm('Are you sure you want to delete this problem?')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/code/problem/${problemId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      // First try to get the response as text
      const responseText = await response.text();

      let data;
      try {
        // Try to parse the response as JSON
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', responseText);
        throw new Error('Server returned invalid JSON');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete problem');
      }

      setMessage({
        type: 'success',
        text: data.message || 'Problem deleted successfully!'
      });

      await fetchProblems();

      if (selectedProblem?.id === problemId) {
        resetForm();
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({
        type: 'error',
        text: `Error deleting problem: ${error.message}`
      });
    }
  };

  const resetForm = () => {
    setProblem({
      title: '',
      description: '',
      inputFormat: '',
      outputFormat: '',
      constraints: [], // Reset to empty array
      functionName: 'MinFinder',
      functionTemplate: `public class MinFinder {
      public int findMin(int[] arr) {
          // Write your code here
      }
  }`,
      example: {
        input: '',
        output: ''
      },
      testCases: [],
      showSolution: false,
      solution: '',
    });
    setSelectedProblem(null);
  };

  const selectProblem = (problem) => {
    setSelectedProblem(problem);
    setProblem({
      ...problem,
      constraints: problem.constraints || [], // Ensure constraints exists
    });
    setShowProblemList(false);
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

  const ConstraintsSection = () => {
    const [newConstraint, setNewConstraint] = useState('');
  
    const addConstraint = () => {
      if (newConstraint.trim()) {
        setProblem(prev => ({
          ...prev,
          constraints: [...(prev.constraints || []), newConstraint.trim()]
        }));
        setNewConstraint('');
      }
    };
  
    const removeConstraint = (index) => {
      setProblem(prev => ({
        ...prev,
        constraints: (prev.constraints || []).filter((_, i) => i !== index)
      }));
    };
  
    return (
      <div className="constraints-section">
        <h3>Constraints</h3>
        <div className="constraints-input">
          <input
            type="text"
            value={newConstraint}
            onChange={(e) => setNewConstraint(e.target.value)}
            placeholder="Add a new constraint (e.g., 1 ≤ n ≤ 10^5)"
            onKeyPress={(e) => e.key === 'Enter' && addConstraint()}
          />
          <button className="add-button" onClick={addConstraint}>
            <Plus size={16} />
            Add
          </button>
        </div>
        <div className="constraints-list">
          {(problem.constraints || []).map((constraint, index) => (
            <div key={index} className="constraint-item">
              <span>{constraint}</span>
              <button
                className="remove-button"
                onClick={() => removeConstraint(index)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
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
        <div className="admin-header">
          <h1>Problem Management</h1>
          <div className="header-actions">
            <button
              className="list-button"
              onClick={() => setShowProblemList(!showProblemList)}
            >
              <List size={16} />
              Problem List
            </button>
            <button
              className="new-button"
              onClick={resetForm}
            >
              <Plus size={16} />
              New Problem
            </button>
          </div>
        </div>

        {showProblemList && (
          <div className="problems-list">
            {problems.map((p) => (
              <div key={p.id} className="problem-list-item">
                <span className="problem-title">{p.title}</span>
                <div className="problem-actions">
                  <button
                    className="edit-button"
                    onClick={() => selectProblem(p)}
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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

        <div className="form-group">
          <label>Solution Management</label>
          <div className="solution-controls">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={problem.showSolution}
                onChange={(e) => setProblem(prev => ({
                  ...prev,
                  showSolution: e.target.checked
                }))}
              />
              Show Solution to Users
            </label>
          </div>
          <textarea
            value={problem.solution}
            onChange={(e) => setProblem(prev => ({
              ...prev,
              solution: e.target.value
            }))}
            placeholder="Enter the solution code here..."
            rows={8}
            className="solution-editor"
          />
        </div>


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

          <ConstraintsSection />

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