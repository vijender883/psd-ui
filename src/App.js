import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { Terminal } from 'lucide-react';
import CohortPage from './CohortPage';
import AssignmentsPage from './AssignmentsPage';
import IndexingLab from './IndexingLab';
import NormalizationLab from './NormalizationLab/NormalizationLab';
import './NormalizationLab/NormalizationLab.css';
import CodingLab from './DSA_playground/CodingLab';
import SQLLab from './SQLLab';
import LandingPage from './LandingPage';
import AdminProblemManager from './Admin/AdminProblemManager';

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
        localStorage.setItem('isAdmin', data.isAdmin);
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

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const isLoggedIn = localStorage.getItem('authToken') !== null;
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const locationhook = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(adminStatus);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
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
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`nav-button tab ${locationhook.pathname === '/admin' ? 'active' : ''}`}
                >
                  Admin
                </Link>
              )}
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
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminProblemManager />
              </ProtectedRoute>
            }
          />
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