import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verify-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.valid) {
        localStorage.setItem('authToken', token);
        onLogin();
        onClose();
      } else {
        setError('Invalid token');
      }
    } catch (err) {
      setError('Failed to verify token');
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Login Required</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="token">Access Token</label>
            <input
              type="password"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your access token"
              required
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Verifying...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [executedQuery, setExecutedQuery] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleClick = () => {
      if (!isLoggedIn) {
        setShowLoginModal(true);
      }
    };

    if (!isLoggedIn) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setResult(null);
    setExecutedQuery(null);
    setQuery('');
  };

  const handleSubmit = useCallback(async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    setLoading(true);
    setError(null);
    setExecutedQuery(query);

    try {
      const token = localStorage.getItem('authToken');
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
  }, [isLoggedIn, query]); // Add dependencies here

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
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-icon">⚡</span>
          SQL Query Executor
        </div>
        <div className="nav-actions">
          {isLoggedIn && (
            <button onClick={handleLogout} className="nav-button primary">
              Logout
            </button>
          )}
        </div>
      </nav>

      <main className="main-content">
        <div className={`content-wrapper ${!isLoggedIn ? 'blurred' : ''}`}>
          <div className="query-section">
            <form onSubmit={handleSubmit} className="query-form">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your SQL query here... (Ctrl + Enter to execute)"
                className="query-input"
              />
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

          </div>

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
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => setIsLoggedIn(true)}
      />
    </div>
  );
};

export default App;