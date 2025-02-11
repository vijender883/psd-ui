// FourthNF.js
import React from 'react';

const FourthNF = () => {
  // Example of a table that violates 4NF
  const violatingTable = {
    name: "Server_Skills_Zones_NonCompliant",
    description: "Violates 4NF due to independent multi-valued facts about servers",
    data: [
      {
        server_id: "S001", skill: "Bartending", service_zone: "Main Dining",
        language: "English", speciality_cuisine: "Italian"
      },
      {
        server_id: "S001", skill: "Bartending", service_zone: "Bar Area",
        language: "Spanish", speciality_cuisine: "Italian"
      },
      {
        server_id: "S001", skill: "Wine Service", service_zone: "Main Dining",
        language: "English", speciality_cuisine: "French"
      }
    ]
  };

  // Base Tables
  const servers = [
    { server_id: "S001", name: "Alice Johnson", hire_date: "2024-01-15" },
    { server_id: "S002", name: "Bob Wilson", hire_date: "2024-01-20" }
  ];

  const skills = [
    { skill_id: "SK001", name: "Bartending", certification_required: true },
    { skill_id: "SK002", name: "Wine Service", certification_required: true },
    { skill_id: "SK003", name: "Food Service", certification_required: false }
  ];

  const service_zones = [
    { zone_id: "Z001", name: "Main Dining", capacity: 100 },
    { zone_id: "Z002", name: "Bar Area", capacity: 30 },
    { zone_id: "Z003", name: "Patio", capacity: 50 }
  ];

  const shifts = [
    { shift_id: "SH001", type: "Morning", start_time: "08:00", end_time: "16:00" },
    { shift_id: "SH002", type: "Evening", start_time: "16:00", end_time: "24:00" }
  ];

  const languages = [
    { language_id: "L001", name: "English", level: "Native" },
    { language_id: "L002", name: "Spanish", level: "Fluent" },
    { language_id: "L003", name: "French", level: "Conversational" }
  ];

  const cuisines = [
    { cuisine_id: "C001", name: "Italian", description: "Italian cuisine specialization" },
    { cuisine_id: "C002", name: "French", description: "French cuisine specialization" }
  ];

  // Multi-valued Relationships (4NF Compliant)
  const server_skills = [
    { server_id: "S001", skill_id: "SK001", certification_date: "2024-01-15" },
    { server_id: "S001", skill_id: "SK002", certification_date: "2024-01-16" }
  ];

  const server_zones = [
    { server_id: "S001", zone_id: "Z001", assignment_date: "2024-02-01" },
    { server_id: "S001", zone_id: "Z002", assignment_date: "2024-02-01" }
  ];

  const server_shifts = [
    { server_id: "S001", shift_id: "SH002", start_date: "2024-02-01" },
    { server_id: "S002", shift_id: "SH001", start_date: "2024-02-01" }
  ];

  const server_languages = [
    { server_id: "S001", language_id: "L001", proficiency_level: "Native" },
    { server_id: "S001", language_id: "L002", proficiency_level: "Fluent" }
  ];

  const server_cuisines = [
    { server_id: "S001", cuisine_id: "C001", experience_years: 2 },
    { server_id: "S001", cuisine_id: "C002", experience_years: 1 }
  ];

  // Additional reference tables
  const certifications = [
    {
      cert_id: "CERT001", name: "Bartending License", issuing_body: "State Board",
      validity_years: 2
    },
    {
      cert_id: "CERT002", name: "Wine Service", issuing_body: "Wine Academy",
      validity_years: 3
    }
  ];

  const server_certifications = [
    {
      server_id: "S001", cert_id: "CERT001", issue_date: "2024-01-15",
      expiry_date: "2026-01-15"
    },
    {
      server_id: "S001", cert_id: "CERT002", issue_date: "2024-01-16",
      expiry_date: "2027-01-16"
    }
  ];

  return (
    <div>
      <div className="description">
        <h3>Fourth Normal Form (4NF)</h3>
        <p>Builds on BCNF by handling multi-valued dependencies:</p>
        <ul>
          <li>Must be in BCNF</li>
          <li>No multi-valued dependencies unless they're functional dependencies</li>
          <li>Separates independent multi-valued facts about an entity</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>🔐 - Composite Primary Key</li>
          <li>↠ - Multi-valued Dependency</li>
          <li>❌ - 4NF Violation</li>
        </ul>
      </div>

      <div className="example-violation">
        <h4>Example of 4NF Violation</h4>
        <p className="violation-note">This table violates 4NF because it combines multiple independent multi-valued facts:</p>
        <ul className="violation-list">
          <li>Server ↠ Skills</li>
          <li>Server ↠ Service Zones</li>
          <li>Server ↠ Languages</li>
          <li>Server ↠ Speciality Cuisines</li>
        </ul>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Server ID</th>
                <th>❌ Skill</th>
                <th>❌ Service Zone</th>
                <th>❌ Language</th>
                <th>❌ Speciality Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.server_id}</td>
                  <td>{row.skill}</td>
                  <td>{row.service_zone}</td>
                  <td>{row.language}</td>
                  <td>{row.speciality_cuisine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h4>4NF Compliant Tables</h4>

      {/* Base Tables Section */}
      <div className="compliant-section">
        <h5>Base Tables</h5>

        <h6>Servers Table</h6>
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
      </div>

      {/* Multi-valued Relationships Section */}
      <div className="compliant-section">
        <h5>Multi-valued Relationships</h5>

        <h6>Server Skills</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔐 Server ID</th>
                <th>🔐 Skill ID</th>
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

        <h6>Server Languages</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔐 Server ID</th>
                <th>🔐 Language ID</th>
                <th>Proficiency Level</th>
              </tr>
            </thead>
            <tbody>
              {server_languages.map((lang, index) => (
                <tr key={index}>
                  <td>{lang.server_id}</td>
                  <td>{lang.language_id}</td>
                  <td>{lang.proficiency_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h6>Server Cuisines</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔐 Server ID</th>
                <th>🔐 Cuisine ID</th>
                <th>Experience Years</th>
              </tr>
            </thead>
            <tbody>
              {server_cuisines.map((cuisine, index) => (
                <tr key={index}>
                  <td>{cuisine.server_id}</td>
                  <td>{cuisine.cuisine_id}</td>
                  <td>{cuisine.experience_years}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .description, .legend {
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
.violation-note {
  color: #dc3545;
  margin-bottom: 10px;
}
.violation-list {
  color: #666;
  margin-bottom: 15px;
}
.compliant-section {
  margin: 20px 0;
}
.table-container {
  margin: 15px 0;
  overflow-x: auto;
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
      `}</style>
    </div>
  );
};

export default FourthNF;