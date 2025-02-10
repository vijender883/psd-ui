import React from 'react';
import { Terminal } from 'lucide-react';

const AssignmentCard = ({ title, dueDate, difficulty, completed, query }) => (
  <div className={`assignment-card ${completed ? 'completed' : ''}`}>
    <div className="assignment-header">
      <Terminal size={20} />
      <h3>{title}</h3>
      <span className={`difficulty-badge ${difficulty.toLowerCase()}`}>
        {difficulty}
      </span>
    </div>
    <div className="assignment-content">
      <p className="query-preview">{query}</p>
    </div>
    <div className="assignment-footer">
      <span className="due-date">Due: {dueDate}</span>
      <button className="assignment-button">
        {completed ? 'Review' : 'Start'}
      </button>
    </div>
  </div>
);

const AssignmentsPage = () => {
  const assignments = [
    {
      title: "Basic SELECT Queries",
      dueDate: "Feb 15, 2024",
      difficulty: "Easy",
      completed: true,
      query: "SELECT * FROM users WHERE age > 25 ORDER BY name;"
    },
    {
      title: "JOIN Operations",
      dueDate: "Feb 20, 2024",
      difficulty: "Medium",
      completed: false,
      query: "SELECT o.order_id, c.customer_name FROM orders o JOIN customers c ON o.customer_id = c.id;"
    },
    {
      title: "Advanced Aggregations",
      dueDate: "Feb 25, 2024",
      difficulty: "Hard",
      completed: false,
      query: "SELECT department, AVG(salary) as avg_salary FROM employees GROUP BY department HAVING COUNT(*) > 5;"
    }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">SQL Assignments</h1>
      <div className="assignments-grid">
        {assignments.map((assignment, index) => (
          <AssignmentCard key={index} {...assignment} />
        ))}
      </div>
    </div>
  );
};

export default AssignmentsPage;