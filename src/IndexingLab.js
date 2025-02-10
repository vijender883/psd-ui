import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const IndexingLab = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [executedQuery, setExecutedQuery] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = useCallback(async (e) => {
    if (e) {
      e.preventDefault();
    }

    setLoading(true);
    setError(null);
    setExecutedQuery(query);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to execute query');
      setResult(null);
    }

    setLoading(false);
  }, [query, navigate]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && query.trim()) {
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [query, handleSubmit]);

  return (
    <div className="workspace">
      {/* <div className="query-section"> */}
      <form onSubmit={handleSubmit} className="query-form">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your SQL query here... (Ctrl + Enter to execute)"
          className="query-input"
        />

        <button 
          disabled={loading} 
          className={`execute-button ${loading ? 'loading' : ''}`}
          onClick={() => setQuery("SELECT * FROM products_not_indexed WHERE name LIKE 'Smartphone %';")}
          >{loading ? 'Executing...' : 'Run Query on Unindexed Table'}
        </button>

        <button
          disabled={loading}
          className={`execute-button ${loading ? 'loading' : ''}`}
          onClick={() => setQuery("SELECT * FROM products_indexed WHERE name LIKE 'Smartphone %';")}
          >{loading ? 'Executing...' : 'Run Query on Indexed Table'}
        </button>
        
        <button
          type="submit"
          disabled={loading}
          className={`execute-button ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Executing...' : 'Execute Query'}
        </button>
      </form>

      {executedQuery && (
        <div className="executed-query">
          <h3>Executed Query</h3>
          <pre>{executedQuery}</pre>
        </div>
      )}

      {error && (
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      {/* </div> */}

      {result && (
        <div className="results-section">
          <div className="results-header">
            <h2>Query Results</h2>
            {result.executionTime && (
              <div className="execution-time">
                Execution Time: {result.executionTime}
              </div>
            )}
          </div>

          <div className="results-table-wrapper">
            <table className="results-table">
              <thead>
                <tr>
                  {result.columns?.map((column, i) => (
                    <th key={i}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows?.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value, j) => (
                      <td key={j}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexingLab;