// ThirdNF.js
import React from 'react';

const ThirdNF = () => {
  // Example of a table that violates 3NF
  const violatingTable = {
    name: "Employee_Department_NonCompliant",
    description: "Violates 3NF due to transitive dependencies",
    data: [
      { employee_id: "E001", name: "Alice Johnson", department_id: "D001", 
        department_name: "Service", manager_id: "M001", manager_name: "John Smith",
        location_id: "L001", location_address: "123 Restaurant St" },
      { employee_id: "E002", name: "Bob Wilson", department_id: "D001", 
        department_name: "Service", manager_id: "M001", manager_name: "John Smith",
        location_id: "L001", location_address: "123 Restaurant St" }
    ]
  };

  // 3NF Compliant Tables
  const employees = [
    { employee_id: "E001", name: "Alice Johnson", department_id: "D001", 
      hire_date: "2024-01-15", position_id: "P001" },
    { employee_id: "E002", name: "Bob Wilson", department_id: "D001", 
      hire_date: "2024-01-20", position_id: "P002" }
  ];

  const departments = [
    { department_id: "D001", name: "Service", manager_id: "M001", location_id: "L001" },
    { department_id: "D002", name: "Kitchen", manager_id: "M002", location_id: "L001" }
  ];

  const managers = [
    { manager_id: "M001", employee_id: "E005", start_date: "2023-01-01" },
    { manager_id: "M002", employee_id: "E006", start_date: "2023-02-01" }
  ];

  const locations = [
    { location_id: "L001", address: "123 Restaurant St", city: "Food City", 
      state: "FC", zip: "12345" },
    { location_id: "L002", address: "456 Dining Ave", city: "Food City", 
      state: "FC", zip: "12345" }
  ];

  const positions = [
    { position_id: "P001", title: "Server", base_pay: "15.00", 
      required_certification: "CERT001" },
    { position_id: "P002", title: "Host", base_pay: "14.00", 
      required_certification: null }
  ];

  const certifications = [
    { certification_id: "CERT001", name: "Food Safety", issuing_body: "FDA", 
      validity_years: 2 }
  ];

  const employee_certifications = [
    { employee_id: "E001", certification_id: "CERT001", 
      date_earned: "2024-01-10", expiry_date: "2026-01-10" }
  ];

  return (
    <div>
      <div className="description">
        <h3>Third Normal Form (3NF)</h3>
        <p>Building on 2NF, eliminates transitive dependencies:</p>
        <ul>
          <li>Must be in 2NF first</li>
          <li>No transitive dependencies (where X → Y → Z)</li>
          <li>Every non-prime attribute must be directly dependent on every key</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>➡️ - Transitive Dependency (Violation)</li>
          <li>✅ - Direct Dependency</li>
        </ul>
      </div>

      <div className="example-violation">
        <h4>Example of 3NF Violation</h4>
        <p className="violation-note">This structure violates 3NF because:</p>
        <ul className="violation-list">
          <li>employee_id → department_id → department_name</li>
          <li>department_id → manager_id → manager_name</li>
          <li>department_id → location_id → location_address</li>
        </ul>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Employee ID</th>
                <th>✅ Name</th>
                <th>🔗 Department ID</th>
                <th>➡️ Department Name</th>
                <th>➡️ Manager ID</th>
                <th>➡️ Manager Name</th>
                <th>➡️ Location ID</th>
                <th>➡️ Location Address</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.employee_id}</td>
                  <td>{row.name}</td>
                  <td>{row.department_id}</td>
                  <td>{row.department_name}</td>
                  <td>{row.manager_id}</td>
                  <td>{row.manager_name}</td>
                  <td>{row.location_id}</td>
                  <td>{row.location_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h4>3NF Compliant Tables</h4>

      <div className="compliant-section">
        <h5>Employees Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Employee ID</th>
                <th>✅ Name</th>
                <th>🔗 Department ID</th>
                <th>✅ Hire Date</th>
                <th>🔗 Position ID</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.employee_id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department_id}</td>
                  <td>{emp.hire_date}</td>
                  <td>{emp.position_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Departments Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Department ID</th>
                <th>✅ Name</th>
                <th>🔗 Manager ID</th>
                <th>🔗 Location ID</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.department_id}</td>
                  <td>{dept.name}</td>
                  <td>{dept.manager_id}</td>
                  <td>{dept.location_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Positions Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Position ID</th>
                <th>✅ Title</th>
                <th>✅ Base Pay</th>
                <th>🔗 Required Certification</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos, index) => (
                <tr key={index}>
                  <td>{pos.position_id}</td>
                  <td>{pos.title}</td>
                  <td>${pos.base_pay}</td>
                  <td>{pos.required_certification || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Employee Certifications Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔗 Employee ID</th>
                <th>🔗 Certification ID</th>
                <th>✅ Date Earned</th>
                <th>✅ Expiry Date</th>
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

export default ThirdNF;