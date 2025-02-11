import React from 'react';

const SecondNF = () => {
  // Example of a table that would violate 2NF
  const violatingTable = {
    name: "Orders_NonCompliant",
    description: "Violates 2NF because product details depend only on Product ID, not the full key",
    data: [
      { order_id: 1, customer_id: 1, product_id: "P1", quantity: 1, 
        product_name: "Laptop", product_price: 1000 },
      { order_id: 2, customer_id: 1, product_id: "P1", quantity: 1, 
        product_name: "Laptop", product_price: 1000 }
    ]
  };

  // 2NF Compliant Tables
  const customers = [
    { customer_id: 1, customer_name: "John Smith" }
  ];

  const phone_numbers = [
    { customer_id: 1, phone_number: "555-0123" },
    { customer_id: 1, phone_number: "555-0124" },
    { customer_id: 1, phone_number: "555-0125" }
  ];

  const addresses = [
    { customer_id: 1, street_address: "123 Main St", city: "New York" },
    { customer_id: 1, street_address: "456 Park Ave", city: "Boston" }
  ];

  const products = [
    { product_id: "P1", product_name: "Laptop", unit_price: 1000 },
    { product_id: "P2", product_name: "Mouse", unit_price: 20 },
    { product_id: "P3", product_name: "Keyboard", unit_price: 50 }
  ];

  const orders = [
    { order_id: 1, customer_id: 1 },
    { order_id: 2, customer_id: 1 },
    { order_id: 3, customer_id: 1 }
  ];

  const order_details = [
    { order_id: 1, product_id: "P1", quantity: 1 },
    { order_id: 2, product_id: "P2", quantity: 2 },
    { order_id: 3, product_id: "P3", quantity: 1 }
  ];

  return (
    <div>
      <div className="description">
        <h3>Second Normal Form (2NF)</h3>
        <p>Building on 1NF:</p>
        <ul>
          <li>Must already be in 1NF (atomic values, no repeating groups)</li>
          <li>No partial dependencies (non-key attributes must depend on the entire primary key)</li>
          <li>Attributes dependent on part of a composite key must be moved to a separate table</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>🔐 - Composite Primary Key</li>
          <li>📦 - Partial Dependency (Violation)</li>
        </ul>
      </div>

      <div className="example-violation">
        <h4>Example of 2NF Violation</h4>
        <div className="table-container">
          <p className="violation-note">This structure violates 2NF because product details depend only on Product ID, not the full composite key:</p>
          <table>
            <thead>
              <tr>
                <th>🔐 Order ID</th>
                <th>🔗 Customer ID</th>
                <th>🔐 Product ID</th>
                <th>Quantity</th>
                <th>📦 Product Name</th>
                <th>📦 Product Price</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.order_id}</td>
                  <td>{row.customer_id}</td>
                  <td>{row.product_id}</td>
                  <td>{row.quantity}</td>
                  <td>{row.product_name}</td>
                  <td>${row.product_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h4>2NF Compliant Tables</h4>

      <div className="compliant-section">
        <h5>Customers Table</h5>
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

        <h5>Phone Numbers Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔗 Customer ID</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {phone_numbers.map((phone, index) => (
                <tr key={index}>
                  <td>{phone.customer_id}</td>
                  <td>{phone.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Addresses Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔗 Customer ID</th>
                <th>Street Address</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address, index) => (
                <tr key={index}>
                  <td>{address.customer_id}</td>
                  <td>{address.street_address}</td>
                  <td>{address.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Products Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Product ID</th>
                <th>Product Name</th>
                <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.product_id}</td>
                  <td>{product.product_name}</td>
                  <td>${product.unit_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Orders Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Order ID</th>
                <th>🔗 Customer ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.customer_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Order Details Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔐 Order ID</th>
                <th>🔐 Product ID</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order_details.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.order_id}</td>
                  <td>{detail.product_id}</td>
                  <td>{detail.quantity}</td>
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

export default SecondNF;