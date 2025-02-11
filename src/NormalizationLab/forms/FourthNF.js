import React from 'react';

const FourthNF = () => {
  // Example of a table that violates 4NF
  const violatingTable = {
    name: "Customer_Contact_Addresses_NonCompliant",
    description: "Violates 4NF due to independent multi-valued facts about customers",
    data: [
      {
        customer_id: 1, phone_number: "555-0123", email: "john@email.com",
        address: "123 Main St", city: "New York"
      },
      {
        customer_id: 1, phone_number: "555-0124", email: "john.work@email.com",
        address: "456 Park Ave", city: "Boston"
      },
      {
        customer_id: 1, phone_number: "555-0125", email: "john@email.com",
        address: "123 Main St", city: "New York"
      }
    ]
  };

  // Base Tables
  const customers = [
    { customer_id: 1, customer_name: "John Smith" }
  ];

  const cities = [
    { city_id: "C1", city_name: "New York", country: "USA" },
    { city_id: "C2", city_name: "Boston", country: "USA" }
  ];

  const email_types = [
    { type_id: "ET1", type_name: "Personal" },
    { type_id: "ET2", type_name: "Work" }
  ];

  const phone_types = [
    { type_id: "PT1", type_name: "Mobile" },
    { type_id: "PT2", type_name: "Home" },
    { type_id: "PT3", type_name: "Work" }
  ];

  // Multi-valued Relationships (4NF Compliant)
  const customer_phones = [
    { phone_id: "PH1", customer_id: 1, phone_number: "555-0123", type_id: "PT1" },
    { phone_id: "PH2", customer_id: 1, phone_number: "555-0124", type_id: "PT2" },
    { phone_id: "PH3", customer_id: 1, phone_number: "555-0125", type_id: "PT3" }
  ];

  const customer_emails = [
    { email_id: "E1", customer_id: 1, email: "john@email.com", type_id: "ET1" },
    { email_id: "E2", customer_id: 1, email: "john.work@email.com", type_id: "ET2" }
  ];

  const customer_addresses = [
    { address_id: "A1", customer_id: 1, street_address: "123 Main St", city_id: "C1", is_primary: true },
    { address_id: "A2", customer_id: 1, street_address: "456 Park Ave", city_id: "C2", is_primary: false }
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
          <li>Customer ↠ Phone Numbers</li>
          <li>Customer ↠ Email Addresses</li>
          <li>Customer ↠ Physical Addresses</li>
        </ul>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>❌ Phone Number</th>
                <th>❌ Email</th>
                <th>❌ Address</th>
                <th>❌ City</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.customer_id}</td>
                  <td>{row.phone_number}</td>
                  <td>{row.email}</td>
                  <td>{row.address}</td>
                  <td>{row.city}</td>
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

        <h6>Customers Table</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Customer ID</th>
                <th>Customer Name</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.customer_id}</td>
                  <td>{customer.customer_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h6>Cities Table</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 City ID</th>
                <th>City Name</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => (
                <tr key={index}>
                  <td>{city.city_id}</td>
                  <td>{city.city_name}</td>
                  <td>{city.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-valued Relationships Section */}
      <div className="compliant-section">
        <h5>Multi-valued Relationships</h5>

        <h6>Customer Phones</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Phone ID</th>
                <th>🔗 Customer ID</th>
                <th>Phone Number</th>
                <th>🔗 Type ID</th>
              </tr>
            </thead>
            <tbody>
              {customer_phones.map((phone, index) => (
                <tr key={index}>
                  <td>{phone.phone_id}</td>
                  <td>{phone.customer_id}</td>
                  <td>{phone.phone_number}</td>
                  <td>{phone.type_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h6>Customer Emails</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Email ID</th>
                <th>🔗 Customer ID</th>
                <th>Email</th>
                <th>🔗 Type ID</th>
              </tr>
            </thead>
            <tbody>
              {customer_emails.map((email, index) => (
                <tr key={index}>
                  <td>{email.email_id}</td>
                  <td>{email.customer_id}</td>
                  <td>{email.email}</td>
                  <td>{email.type_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h6>Customer Addresses</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Address ID</th>
                <th>🔗 Customer ID</th>
                <th>Street Address</th>
                <th>🔗 City ID</th>
                <th>Is Primary</th>
              </tr>
            </thead>
            <tbody>
              {customer_addresses.map((address, index) => (
                <tr key={index}>
                  <td>{address.address_id}</td>
                  <td>{address.customer_id}</td>
                  <td>{address.street_address}</td>
                  <td>{address.city_id}</td>
                  <td>{address.is_primary ? 'Yes' : 'No'}</td>
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
        h5, h6 {
          color: #2563eb;
          margin: 20px 0 10px 0;
        }
      `}</style>
    </div>
  );
};

export default FourthNF;