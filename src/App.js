import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { Terminal, BookOpen, Users, Clock } from 'lucide-react';
import CohortPage from './CohortPage';
import AssignmentsPage from './AssignmentsPage';
import IndexingLab from './IndexingLab';
import NormalizationLab from './NormalizationLab/NormalizationLab';
import './NormalizationLab/NormalizationLab.css';
import CodingLab from './DSA_playground/CodingLab';


// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon">
      <Icon size={24} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Login Modal Component
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
        <h2>Welcome Back!</h2>
        <p className="modal-subtitle">Enter your access token to continue learning</p>
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
            {loading ? 'Verifying...' : 'Start Learning'}
          </button>
        </form>
      </div>
    </div>
  );
};

// SQL Lab Component
const SQLLab = () => {
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

// Landing Page Component
const LandingPage = ({ onLoginClick }) => (
  <div className="landing-section">
    <div className="hero">
      <h1>Master SQL and System Design</h1>
      <p className="hero-subtitle">Learn practical database skills through hands-on exercises and real-world scenarios</p>
      <button onClick={onLoginClick} className="cta-button">
        Start Learning Now
      </button>
    </div>

    <div className="features-grid">
      <FeatureCard
        icon={BookOpen}
        title="Practical Learning"
        description="Learn through hands-on exercises and real-world scenarios"
      />
      <FeatureCard
        icon={Users}
        title="Cohort-Based"
        description="Learn alongside peers and get personalized feedback"
      />
      <FeatureCard
        icon={Terminal}
        title="Interactive SQL"
        description="Write and execute SQL queries in real-time"
      />
      <FeatureCard
        icon={Clock}
        title="Self-Paced"
        description="Learn at your own pace with structured modules"
      />
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('authToken') !== null;
  const locationhook = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: locationhook }} replace />;
  }

  return children;
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const locationhook = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleNavHeaderClick = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand" onClick={handleNavHeaderClick} style={{ cursor: 'pointer' }}>
          <Terminal className="nav-icon" />
          <span>Practical System Design</span>
        </div>
        <div className="nav-actions">
          {!isLoggedIn ? (
            <button onClick={() => setShowLoginModal(true)} className="nav-button primary">
              Join Cohort
            </button>
          ) : (
            <>
              <Link
                to="/coding"
                className={`nav-button tab ${locationhook.pathname === '/coding' ? 'active' : ''}`}
              >
                DSA Playground
              </Link>
              <Link
                to="/normalization"
                className={`nav-button tab ${locationhook.pathname === '/normalization' ? 'active' : ''}`}
              >
                Normalization Lab
              </Link>

              <Link
                to="/indexinglab"
                className={`nav-button tab ${locationhook.pathname === '/indexinglab' ? 'active' : ''}`}
              >
                IndexingLab
              </Link>
              <Link
                to="/sql"
                className={`nav-button tab ${locationhook.pathname === '/sql' ? 'active' : ''}`}
              >
                SQL Lab
              </Link>
              <Link
                to="/cohorts"
                className={`nav-button tab ${locationhook.pathname === '/cohorts' ? 'active' : ''}`}
              >
                My Cohorts
              </Link>
              <Link
                to="/assignments"
                className={`nav-button tab ${locationhook.pathname === '/assignments' ? 'active' : ''}`}
              >
                Assignments
              </Link>
              <button onClick={handleLogout} className="nav-button outline">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={
            !isLoggedIn ?
              <LandingPage onLoginClick={() => setShowLoginModal(true)} /> :
              <Navigate to="/sql" replace />
          } />
          <Route
            path="/coding"
            element={
              <ProtectedRoute>
                <CodingLab />
              </ProtectedRoute>
            }
          />
          <Route
            path="/normalization"
            element={
              <ProtectedRoute>
                <NormalizationLab />
                <SQLLab />
              </ProtectedRoute>
            }
          />
          <Route
            path="/indexinglab"
            element={
              <ProtectedRoute>
                <IndexingLab />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sql"
            element={
              <ProtectedRoute>
                <SQLLab />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cohorts"
            element={
              <ProtectedRoute>
                <CohortPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignments"
            element={
              <ProtectedRoute>
                <AssignmentsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          navigate('/sql');
        }}
      />
    </div>
  );
};

// Wrap the app with Router
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;