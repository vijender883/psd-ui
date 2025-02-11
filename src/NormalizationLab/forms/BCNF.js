// BCNF.js
import React from 'react';

const BCNF = () => {
  const restaurant_tables = [
    { table_number: "T1", capacity: 4, section: "Main" },
    { table_number: "T2", capacity: 6, section: "Patio" }
  ];

  const server_sections = [
    { server_id: "S001", section: "Main", shift: "Evening" },
    { server_id: "S002", section: "Patio", shift: "Evening" }
  ];

  const server_skills = [
    { server_id: "S001", skill_id: "SK001" },
    { server_id: "S001", skill_id: "SK002" }
  ];

  const skills = [
    { skill_id: "SK001", skill_name: "Bartending", certification_required: true },
    { skill_id: "SK002", skill_name: "Wine Service", certification_required: true }
  ];

  const server_certifications = [
    { certification_id: "CERT001", server_id: "S001", skill_id: "SK001", 
      issued_date: "2024-01-01", expiry_date: "2025-01-01" }
  ];

  // Example of a table that would violate BCNF
  const violating_table = {
    title: "Server Assignments (Before BCNF)",
    data: [
      { server_id: "S001", section: "Main", table_numbers: "T1, T2, T3" },
      { server_id: "S002", section: "Patio", table_numbers: "T4, T5" }
    ],
    explanation: "Section determines table_numbers, but section is not a key"
  };

  return (
    <div>
      <div className="description">
        <h3>Boyce-Codd Normal Form (BCNF)</h3>
        <p>Stricter version of 3NF where:</p>
        <ul>
          <li>Must already be in 3NF</li>
          <li>For every dependency A → B, A must be a superkey</li>
          <li>All determinants must be candidate keys</li>
          <li>Eliminates all functional dependencies except those where a key determines a non-key</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>🎯 - Determinant</li>
          <li>↪️ - Functional Dependency</li>
        </ul>
      </div>

      <div className="bcnf-example">
        <h4>BCNF Violation Example (Before Normalization)</h4>
        <p>In the server assignments:</p>
        <code>
          {`Section → Table_Numbers (Violates BCNF because Section is not a superkey)`}
        </code>
        <p>Solution: Decompose into two relations:</p>
        <ul>
          <li>Section_Tables (Section 🔑, Table_Numbers)</li>
          <li>Server_Sections (Server_ID 🔑, Section 🔗)</li>
        </ul>
      </div>

      <h4>Restaurant Tables (BCNF Compliant)</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Table Number</th>
              <th>🎯 Capacity</th>
              <th>🎯 Section</th>
            </tr>
          </thead>
          <tbody>
            {restaurant_tables.map((table, index) => (
              <tr key={index}>
                <td>{table.table_number}</td>
                <td>{table.capacity}</td>
                <td>{table.section}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Server Sections (BCNF Compliant)</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Server ID</th>
              <th>🔑 Section</th>
              <th>Shift</th>
            </tr>
          </thead>
          <tbody>
            {server_sections.map((ss, index) => (
              <tr key={index}>
                <td>{ss.server_id}</td>
                <td>{ss.section}</td>
                <td>{ss.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Server Skills (BCNF Compliant)</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔐 Server ID</th>
              <th>🔐 Skill ID</th>
            </tr>
          </thead>
          <tbody>
            {server_skills.map((skill, index) => (
              <tr key={index}>
                <td>{skill.server_id}</td>
                <td>{skill.skill_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="explanation-box">
        <h4>Key BCNF Improvements</h4>
        <ul>
          <li>Section no longer determines table assignments (removed transitive dependency)</li>
          <li>Skills and certifications are properly separated</li>
          <li>Server sections have composite keys where needed</li>
          <li>All determinants are now superkeys</li>
        </ul>
      </div>

      <style jsx>{`
        .description, .legend, .bcnf-example, .explanation-box {
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 5px;
        }
        .bcnf-example code {
          display: block;
          padding: 10px;
          background: #f1f1f1;
          border-radius: 4px;
          margin: 10px 0;
        }
        .table-container {
          margin-bottom: 30px;
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default BCNF;