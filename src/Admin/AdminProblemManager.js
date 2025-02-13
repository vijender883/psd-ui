import React, { useState, useEffect } from 'react';
import { Plus, Save, Trash2, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './AdminProblemManager.css';

const AdminProblemManager = () => {
  const [problem, setProblem] = useState({
    title: '',
    description: '',
    inputFormat: '',
    outputFormat: '',
    example: {
      input: '',
      output: ''
    },
    testCases: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showTestCases, setShowTestCases] = useState(true);

  useEffect(() => {
    fetchProblemData();
  }, []);

  const fetchProblemData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/problem`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const data = await response.json();
      setProblem(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch problem data' });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/problem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(problem)
      });
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Problem updated successfully' });
      } else {
        throw new Error('Failed to update problem');
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const addTestCase = () => {
    setProblem(prev => ({
      ...prev,
      testCases: [...prev.testCases, {
        input: [],
        expectedOutput: null,
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
            const inputArray = value.split(',').map(num => parseInt(num.trim()));
            return { ...testCase, input: inputArray };
          }
          if (field === 'expectedOutput') {
            return { ...testCase, expectedOutput: parseInt(value) };
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
                          value={testCase.input.join(', ')}
                          onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                          placeholder="Comma-separated numbers"
                        />
                      </div>
                      <div className="form-group">
                        <label>Expected Output</label>
                        <input
                          type="text"
                          value={testCase.expectedOutput || ''}
                          onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Description</label>
                      <input
                        type="text"
                        value={testCase.description}
                        onChange={(e) => updateTestCase(index, 'description', e.target.value)}
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