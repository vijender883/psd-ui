import React from 'react';

const FirstNF = () => {
  const customers = [
    { customer_id: 1, customer_name: 'John Smith', phone_number: '555-0123' },
    { customer_id: 1, customer_name: 'John Smith', phone_number: '555-0124' },
    { customer_id: 1, customer_name: 'John Smith', phone_number: '555-0125' }
  ];

  const addresses = [
    { customer_id: 1, street_address: '123 Main St', city: 'New York' },
    { customer_id: 1, street_address: '456 Park Ave', city: 'Boston' }
  ];

  const orders = [
    { order_id: 1, customer_id: 1, product: 'Laptop', quantity: 1, price: 1000 },
    { order_id: 2, customer_id: 1, product: 'Mouse', quantity: 2, price: 20 },
    { order_id: 3, customer_id: 1, product: 'Keyboard', quantity: 1, price: 50 }
  ];

  return (
    <div>
      <div className="description">
        <h3>First Normal Form (1NF)</h3>
        <p>Data has been normalized to ensure:</p>
        <ul>
          <li>Each column contains atomic values (no multi-valued attributes)</li>
          <li>No repeating groups (phone numbers and addresses are separated)</li>
          <li>Each record is unique</li>
          <li>All values in a column are of the same domain</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>🔐 - Composite Primary Key</li>
        </ul>
      </div>

      <h4>Customers Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔗 Customer ID</th>
              <th>Customer Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.customer_id}</td>
                <td>{customer.customer_name}</td>
                <td>{customer.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Addresses Table</h4>
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

      <h4>Orders Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Order ID</th>
              <th>🔗 Customer ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.order_id}</td>
                <td>{order.customer_id}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>${order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .description {
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 5px;
        }
        .legend {
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 5px;
        }
        .legend ul {
          list-style: none;
          padding-left: 0;
        }
        .legend li {
          margin: 5px 0;
        }
        .table-container {
          margin-bottom: 30px;
          overflow-x: auto;
        }
        h4 {
          margin-top: 20px;
          color: #333;
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
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default FirstNF;