// NormalizationLab.js
import React, { useState } from 'react';
import ZeroNF from './forms/ZeroNF';
import FirstNF from './forms/FirstNF';
import SecondNF from './forms/SecondNF';
import ThirdNF from './forms/ThirdNF';
import BCNF from './forms/BCNF';
import FourthNF from './forms/FourthNF';
import FifthNF from './forms/FifthNF';
import './NormalizationLab.css';

const NormalizationLab = () => {
  const [activeTab, setActiveTab] = useState('0nf');

  const renderComponent = () => {
    switch(activeTab) {
      case '0nf': return <ZeroNF />;
      case '1nf': return <FirstNF />;
      case '2nf': return <SecondNF />;
      case '3nf': return <ThirdNF />;
      case 'bcnf': return <BCNF />;
      case '4nf': return <FourthNF />;
      case '5nf': return <FifthNF />;
      default: return null;
    }
  };

  return (
    <div className="normalization-container">
      <h2 className="main-title">Restaurant Database Normalization</h2>
      <div className="tab-container">
        <div className="tab-list">
          <button className={`tab-button ${activeTab === '0nf' ? 'active' : ''}`} onClick={() => setActiveTab('0nf')}>0NF</button>
          <button className={`tab-button ${activeTab === '1nf' ? 'active' : ''}`} onClick={() => setActiveTab('1nf')}>1NF</button>
          <button className={`tab-button ${activeTab === '2nf' ? 'active' : ''}`} onClick={() => setActiveTab('2nf')}>2NF</button>
          <button className={`tab-button ${activeTab === '3nf' ? 'active' : ''}`} onClick={() => setActiveTab('3nf')}>3NF</button>
          <button className={`tab-button ${activeTab === 'bcnf' ? 'active' : ''}`} onClick={() => setActiveTab('bcnf')}>BCNF</button>
          <button className={`tab-button ${activeTab === '4nf' ? 'active' : ''}`} onClick={() => setActiveTab('4nf')}>4NF</button>
          <button className={`tab-button ${activeTab === '5nf' ? 'active' : ''}`} onClick={() => setActiveTab('5nf')}>5NF</button>
        </div>
        <div className="tab-content">
          {renderComponent()}
        </div>
      </div>
    </div>

    
  );
};

export default NormalizationLab;