import React from 'react';
import FeatureCard from './utils/FeatureCard';
import { BookOpen, Users, Terminal, Clock } from 'lucide-react';

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

export default LandingPage;