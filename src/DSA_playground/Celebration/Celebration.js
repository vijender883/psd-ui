import React from 'react';
import { PartyPopper } from 'lucide-react';
import './Celebration.css';

const Celebration = () => {
  return (
    <div className="celebration-overlay">
      <div className="celebration-content">
        <PartyPopper className="celebration-icon" size={48} />
        <h2>Perfect Score! 🎉</h2>
      </div>
    </div>
  );
};

export default Celebration;