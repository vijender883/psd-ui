import React from 'react';

const CohortCard = ({ name, progress, startDate, nextSession }) => (
  <div className="cohort-card">
    <div className="cohort-header">
      <h3>{name}</h3>
      <div className="progress-badge">{progress}% Complete</div>
    </div>
    <div className="cohort-info">
      <p>Started: {startDate}</p>
      <p>Next Session: {nextSession}</p>
    </div>
    <button className="cohort-button">Continue Learning</button>
  </div>
);

const CohortPage = () => {
  const cohorts = [
    {
      name: "SQL Fundamentals Cohort",
      progress: 65,
      startDate: "Jan 15, 2024",
      nextSession: "Tomorrow, 3 PM EST"
    },
    {
      name: "Advanced Database Design",
      progress: 30,
      startDate: "Feb 1, 2024",
      nextSession: "Friday, 2 PM EST"
    },
    {
      name: "System Design Principles",
      progress: 85,
      startDate: "Dec 10, 2023",
      nextSession: "Completed"
    }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">My Cohorts</h1>
      <div className="cohorts-grid">
        {cohorts.map((cohort, index) => (
          <CohortCard key={index} {...cohort} />
        ))}
      </div>
    </div>
  );
};

export default CohortPage;