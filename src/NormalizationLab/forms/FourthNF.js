// FourthNF.js
import React from 'react';

const FourthNF = () => {
  // Example of a table that violates 4NF
  const violatingTable = {
    name: "Server_Skills_Schedules_NonCompliant",
    description: "This table violates 4NF because there are two independent multivalued facts about the server",
    data: [
      { server_id: "S1", skill: "Bartending", schedule: "Monday Morning" },
      { server_id: "S1", skill: "Bartending", schedule: "Tuesday Evening" },
      { server_id: "S1", skill: "Wine Service", schedule: "Monday Morning" },
      { server_id: "S1", skill: "Wine Service", schedule: "Tuesday Evening" }
    ]
  };

  // 4NF Compliant Tables
  const servers = [
    { server_id: "S1", name: "Alice Johnson", hire_date: "2024-01-15" },
    { server_id: "S2", name: "Bob Smith", hire_date: "2024-02-01" }
  ];

  const server_skills = [
    { server_id: "S1", skill_id: "SK1", certification_date: "2024-01-15" },
    { server_id: "S1", skill_id: "SK2", certification_date: "2024-01-20" },
    { server_id: "S2", skill_id: "SK1", certification_date: "2024-02-01" }
  ];

  const skills = [
    { skill_id: "SK1", name: "Bartending", certification_required: true },
    { skill_id: "SK2", name: "Wine Service", certification_required: true },
    { skill_id: "SK3", name: "Host", certification_required: false }
  ];

  const server_schedules = [
    { server_id: "S1", schedule_id: "SCH1", day: "Monday", shift: "Morning" },
    { server_id: "S1", schedule_id: "SCH2", day: "Tuesday", shift: "Evening" },
    { server_id: "S2", schedule_id: "SCH1", day: "Monday", shift: "Evening" }
  ];

  const server_sections = [
    { server_id: "S1", section_id: "SEC1", assignment_date: "2024-02-11" },
    { server_id: "S2", section_id: "SEC2", assignment_date: "2024-02-11" }
  ];

  return (
    <div>
      <div className="description">
        <h3>Fourth Normal Form (4NF)</h3>
        <p>A relation is in 4NF if it is in BCNF and has no multi-valued dependencies. Requirements:</p>
        <ul>
          <li>Must be in BCNF</li>
          <li>No non-trivial multivalued dependencies except for full functional dependencies</li>
          <li>All multivalued dependencies are functional dependencies</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>↠ - Multivalued Dependency</li>
          <li>❌ - 4NF Violation</li>
          <li>✅ - 4NF Compliant</li>
        </ul>
      </div>

      <div className="example-violation">
        <h4>Example of 4NF Violation</h4>
        <p className="violation-explanation">
          In this non-compliant table, a server's skills and schedules are combined, 
          creating a Cartesian product of independent facts about the server:
        </p>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Server ID</th>
                <th>❌ Skill</th>
                <th>❌ Schedule</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.server_id}</td>
                  <td>{row.skill}</td>
                  <td>{row.schedule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="violation-note">
          This creates redundancy because skills and schedules are independent of each other:
          Server ↠ Skills and Server ↠ Schedules
        </p>
      </div>

      <h4>4NF Compliant Tables</h4>
      
      <div className="compliant-section">
        <h5>Servers Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Server ID</th>
                <th>Name</th>
                <th>Hire Date</th>
              </tr>
            </thead>
            <tbody>
              {servers.map((server, index) => (
                <tr key={index}>
                  <td>{server.server_id}</td>
                  <td>{server.name}</td>
                  <td>{server.hire_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Server Skills Table (✅ Separated MVD)</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔗 Server ID</th>
                <th>🔗 Skill ID</th>
                <th>Certification Date</th>
              </tr>
            </thead>
            <tbody>
              {server_skills.map((skill, index) => (
                <tr key={index}>
                  <td>{skill.server_id}</td>
                  <td>{skill.skill_id}</td>
                  <td>{skill.certification_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Server Schedules Table (✅ Separated MVD)</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔗 Server ID</th>
                <th>🔗 Schedule ID</th>
                <th>Day</th>
                <th>Shift</th>
              </tr>
            </thead>
            <tbody>
              {server_schedules.map((schedule, index) => (
                <tr key={index}>
                  <td>{schedule.server_id}</td>
                  <td>{schedule.schedule_id}</td>
                  <td>{schedule.day}</td>
                  <td>{schedule.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="explanation">
        <h4>Key 4NF Improvements</h4>
        <ol>
          <li>Separated independent multivalued facts about servers:
            <ul>
              <li>Skills are stored independently</li>
              <li>Schedules are stored independently</li>
              <li>Sections are stored independently</li>
            </ul>
          </li>
          <li>Eliminated redundancy from Cartesian products</li>
          <li>Each table represents a single type of multivalued dependency</li>
          <li>No non-trivial multivalued dependencies in any relation</li>
        </ol>
      </div>

      <style jsx>{`
        .description, .legend, .explanation {
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 5px;
        }
        .example-violation {
          margin: 20px 0;
          padding: 15px;
          background: #fff4f4;
          border-radius: 5px;
        }
        .violation-explanation {
          color: #666;
          margin-bottom: 10px;
        }
        .violation-note {
          color: #dc3545;
          font-style: italic;
          margin-top: 10px;
        }
        .compliant-section {
          margin: 20px 0;
        }
        .table-container {
          margin: 15px 0;
          overflow-x: auto;
          background: white;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 10px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f5f5f5;
        }
        h5 {
          color: #2563eb;
          margin: 20px 0 10px 0;
        }
        .explanation ol {
          padding-left: 20px;
        }
        .explanation li {
          margin: 8px 0;
        }
        .explanation ul {
          margin-top: 5px;
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
};

export default FourthNF;