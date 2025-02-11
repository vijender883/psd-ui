// ThirdNF.js
import React from 'react';

const ThirdNF = () => {
  const employees = [
    { employee_id: "E001", name: "Alice Johnson", hire_date: "2023-01-15", 
      department_id: "D001", role_id: "R001" },
    { employee_id: "E002", name: "Bob Wilson", hire_date: "2023-03-20", 
      department_id: "D001", role_id: "R002" }
  ];

  const departments = [
    { department_id: "D001", name: "Food Service", location_id: "L001", 
      manager_id: "E001" }
  ];

  const locations = [
    { location_id: "L001", address: "123 Restaurant Ave", city: "Food City", 
      state: "FC", postal_code: "12345", country: "USA" }
  ];

  const roles = [
    { role_id: "R001", title: "Head Server", base_pay: "18.00", 
      required_certification: "Food Safety Level 2" },
    { role_id: "R002", title: "Server", base_pay: "15.00", 
      required_certification: "Food Safety Level 1" }
  ];

  const certifications = [
    { certification_id: "CERT001", name: "Food Safety Level 2", 
      issuing_body: "Food Safety Board", validity_period: "2 years" },
    { certification_id: "CERT002", name: "Food Safety Level 1", 
      issuing_body: "Food Safety Board", validity_period: "1 year" }
  ];

  const employee_certifications = [
    { employee_id: "E001", certification_id: "CERT001", 
      date_earned: "2023-01-10", expiry_date: "2025-01-10" },
    { employee_id: "E002", certification_id: "CERT002", 
      date_earned: "2023-03-15", expiry_date: "2024-03-15" }
  ];

  return (
    <div>
      <div className="description">
        <h3>Third Normal Form (3NF)</h3>
        <p>Building on 2NF, we've eliminated transitive dependencies:</p>
        <ul>
          <li>Must already be in 2NF</li>
          <li>No transitive dependencies (where A → B → C)</li>
          <li>All attributes depend directly on the primary key</li>
          <li>Non-prime attributes are not transitively dependent on the candidate key</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>⚡ - Transitive Dependency (Resolved)</li>
          <li>🎯 - Direct Dependency</li>
        </ul>
      </div>

      <div className="examples">
        <p><strong>Transitive Dependencies Resolved:</strong></p>
        <ul>
          <li>⚡ Department → Location → Address (Split into separate tables)</li>
          <li>⚡ Employee → Role → Base Pay (Separated role information)</li>
          <li>⚡ Role → Certification → Issuing Body (Normalized certification data)</li>
        </ul>
      </div>

      <h4>Employees Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Employee ID</th>
              <th>🎯 Name</th>
              <th>🎯 Hire Date</th>
              <th>🔗 Department ID</th>
              <th>🔗 Role ID</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.employee_id}</td>
                <td>{emp.name}</td>
                <td>{emp.hire_date}</td>
                <td>{emp.department_id}</td>
                <td>{emp.role_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Departments Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Department ID</th>
              <th>🎯 Name</th>
              <th>🔗 Location ID</th>
              <th>🔗 Manager ID</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={index}>
                <td>{dept.department_id}</td>
                <td>{dept.name}</td>
                <td>{dept.location_id}</td>
                <td>{dept.manager_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Roles Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Role ID</th>
              <th>🎯 Title</th>
              <th>🎯 Base Pay</th>
              <th>🔗 Required Certification</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index}>
                <td>{role.role_id}</td>
                <td>{role.title}</td>
                <td>${role.base_pay}</td>
                <td>{role.required_certification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Employee Certifications Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔗 Employee ID</th>
              <th>🔗 Certification ID</th>
              <th>🎯 Date Earned</th>
              <th>🎯 Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {employee_certifications.map((cert, index) => (
              <tr key={index}>
                <td>{cert.employee_id}</td>
                <td>{cert.certification_id}</td>
                <td>{cert.date_earned}</td>
                <td>{cert.expiry_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .description, .legend, .examples {
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 5px;
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

export default ThirdNF;