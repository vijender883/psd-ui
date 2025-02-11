// FifthNF.js
import React from 'react';

const FifthNF = () => {
  // Example of a table that violates 5NF
  const violatingTable = {
    name: "Menu_Supplier_Kitchen_NonCompliant",
    description: "Violates 5NF due to cyclic dependency between menu items, suppliers, and kitchen sections",
    data: [
      { item_id: "I1", supplier_id: "S1", kitchen_id: "K1", notes: "Fresh ingredients only" },
      { item_id: "I1", supplier_id: "S2", kitchen_id: "K1", notes: "Backup supplier" },
      { item_id: "I2", supplier_id: "S1", kitchen_id: "K2", notes: "Daily delivery" }
    ]
  };

  // 5NF Compliant Tables
  const menu_items = [
    { item_id: "I1", name: "Pizza Margherita", category: "Pizza" },
    { item_id: "I2", name: "Pasta Carbonara", category: "Pasta" }
  ];

  const suppliers = [
    { supplier_id: "S1", name: "Fresh Foods Inc", rating: "A" },
    { supplier_id: "S2", name: "Quality Grocers", rating: "B" }
  ];

  const kitchen_sections = [
    { kitchen_id: "K1", name: "Hot Kitchen", manager: "Chef John" },
    { kitchen_id: "K2", name: "Pasta Station", manager: "Chef Maria" }
  ];

  // Join Tables (5NF Compliant)
  const item_supplier = [
    { item_id: "I1", supplier_id: "S1" },
    { item_id: "I1", supplier_id: "S2" },
    { item_id: "I2", supplier_id: "S1" }
  ];

  const item_kitchen = [
    { item_id: "I1", kitchen_id: "K1" },
    { item_id: "I2", kitchen_id: "K2" }
  ];

  const supplier_kitchen = [
    { supplier_id: "S1", kitchen_id: "K1" },
    { supplier_id: "S1", kitchen_id: "K2" },
    { supplier_id: "S2", kitchen_id: "K1" }
  ];

  return (
    <div>
      <div className="description">
        <h3>Fifth Normal Form (5NF)</h3>
        <p>Also known as Project-Join Normal Form (PJNF). Requirements:</p>
        <ul>
          <li>Must be in 4NF</li>
          <li>Every join dependency must be implied by candidate keys</li>
          <li>Cannot be decomposed further without losing information</li>
          <li>Handles cases where multiple relationships exist between entities</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>↺ - Join Dependency</li>
          <li>❌ - 5NF Violation</li>
          <li>✅ - 5NF Compliant</li>
        </ul>
      </div>

      <div className="example-violation">
        <h4>Example of 5NF Violation</h4>
        <p className="violation-explanation">
          Consider this table combining menu items, suppliers, and kitchen sections:
        </p>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>❌ Item ID</th>
                <th>❌ Supplier ID</th>
                <th>❌ Kitchen ID</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.item_id}</td>
                  <td>{row.supplier_id}</td>
                  <td>{row.kitchen_id}</td>
                  <td>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="violation-note">
          This structure creates problems because:
          <ul>
            <li>There's a cyclic relationship between items, suppliers, and kitchens</li>
            <li>Can't represent relationships independently</li>
            <li>Leads to update and deletion anomalies</li>
          </ul>
        </p>
      </div>

      <h4>5NF Compliant Tables</h4>
      
      <div className="compliant-section">
        <h5>Menu Items Table (Base Relation)</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Item ID</th>
                <th>Name</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {menu_items.map((item, index) => (
                <tr key={index}>
                  <td>{item.item_id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Item-Supplier Relationship (✅ Join Table)</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔗 Item ID</th>
                <th>🔗 Supplier ID</th>
              </tr>
            </thead>
            <tbody>
              {item_supplier.map((is, index) => (
                <tr key={index}>
                  <td>{is.item_id}</td>
                  <td>{is.supplier_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Item-Kitchen Relationship (✅ Join Table)</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔗 Item ID</th>
                <th>🔗 Kitchen ID</th>
              </tr>
            </thead>
            <tbody>
              {item_kitchen.map((ik, index) => (
                <tr key={index}>
                  <td>{ik.item_id}</td>
                  <td>{ik.kitchen_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Supplier-Kitchen Relationship (✅ Join Table)</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔗 Supplier ID</th>
                <th>🔗 Kitchen ID</th>
              </tr>
            </thead>
            <tbody>
              {supplier_kitchen.map((sk, index) => (
                <tr key={index}>
                  <td>{sk.supplier_id}</td>
                  <td>{sk.kitchen_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="explanation">
        <h4>Key 5NF Improvements</h4>
        <ol>
          <li>Separated cyclic relationships into binary relationships:
            <ul>
              <li>Item-Supplier relationships</li>
              <li>Item-Kitchen relationships</li>
              <li>Supplier-Kitchen relationships</li>
            </ul>
          </li>
          <li>Each relationship can be maintained independently</li>
          <li>Original relation can be reconstructed through joins</li>
          <li>No information loss in the decomposition</li>
          <li>Eliminates update and deletion anomalies</li>
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
          margin-top: 10px;
        }
        .violation-note ul {
          margin-top: 5px;
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

export default FifthNF;