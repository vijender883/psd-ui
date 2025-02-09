import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [executedQuery, setExecutedQuery] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setExecutedQuery(query); // Store the executed query

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>SQL Query Executor</h1>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your SQL query here..."
          style={{
            width: '100%',
            height: '150px',
            padding: '10px',
            marginBottom: '10px',
            fontFamily: 'monospace',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '4px'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Executing...' : 'Execute Query'}
        </button>
      </form>

      {executedQuery && (
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e8f4ff',
          borderRadius: '4px',
          border: '1px solid #b3d7ff'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '10px', color: '#0056b3' }}>Executed Query:</h3>
          <pre style={{ 
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'monospace'
          }}>
            {executedQuery}
          </pre>
        </div>
      )}

      {error && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
          border: '1px solid #ffcdd2'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Error:</h3>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0 }}>Query Results</h2>
            {result.executionTime && (
              <div style={{
                backgroundColor: '#e8f5e9',
                padding: '8px 16px',
                borderRadius: '4px',
                color: '#2e7d32',
                fontFamily: 'monospace'
              }}>
                Execution Time: {result.executionTime}
              </div>
            )}
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '10px'
            }}>
              <thead>
                <tr>
                  {result.columns?.map((column, i) => (
                    <th key={i} style={{
                      padding: '10px',
                      backgroundColor: '#f8f9fa',
                      borderBottom: '2px solid #dee2e6',
                      textAlign: 'left'
                    }}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows?.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value, j) => (
                      <td key={j} style={{
                        padding: '10px',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        {value}
                      </td>
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
}

export default App;
