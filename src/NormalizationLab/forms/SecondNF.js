// SecondNF.js
import React from 'react';

const SecondNF = () => {
  // Example of a table that would violate 2NF (for demonstration)
  const nonCompliantTable = {
    name: "Order_Items_NonCompliant",
    description: "This table violates 2NF because item name and price depend only on item_id, not the full key (order_id, item_id)",
    data: [
      { order_id: "O1", item_id: "I1", item_name: "Pizza", category: "Main", price: 15.00, quantity: 2 },
      { order_id: "O2", item_id: "I1", item_name: "Pizza", category: "Main", price: 15.00, quantity: 1 }
    ]
  };

  // 2NF Compliant Tables
  const orders = [
    { order_id: "O1", customer_id: "C1", order_date: "2024-02-11", 
      total_amount: 45.00, status: "Completed" },
    { order_id: "O2", customer_id: "C2", order_date: "2024-02-11", 
      total_amount: 25.00, status: "In Progress" }
  ];

  const menu_items = [
    { item_id: "I1", name: "Margherita Pizza", category_id: "CAT1", 
      base_price: 15.00, description: "Classic Italian pizza" },
    { item_id: "I2", name: "Spaghetti", category_id: "CAT2", 
      base_price: 12.00, description: "Traditional pasta" }
  ];

  const order_items = [
    { order_id: "O1", item_id: "I1", quantity: 2, price_at_time: 15.00, 
      special_instructions: "Extra cheese" },
    { order_id: "O1", item_id: "I2", quantity: 1, price_at_time: 12.00, 
      special_instructions: null },
    { order_id: "O2", item_id: "I1", quantity: 1, price_at_time: 15.00, 
      special_instructions: "Well done" }
  ];

  const categories = [
    { category_id: "CAT1", name: "Pizza", kitchen_section: "Hot Kitchen" },
    { category_id: "CAT2", name: "Pasta", kitchen_section: "Hot Kitchen" }
  ];

  return (
    <div>
      <div className="description">
        <h3>Second Normal Form (2NF)</h3>
        <p>A relation is in 2NF if it:</p>
        <ul>
          <li>Is already in 1NF (has atomic values)</li>
          <li>Has no partial dependencies (non-key attributes depend on the entire primary key)</li>
          <li>All non-key attributes are fully dependent on the primary key</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>🔐 - Composite Primary Key</li>
          <li>📦 - Partial Dependency (Violation)</li>
          <li>✅ - Full Dependency</li>
        </ul>
      </div>

      <div className="example-violation">
        <h4>Example of 2NF Violation (Before Normalization)</h4>
        <div className="violation-table">
          <p><strong>Non-Compliant Table Structure:</strong></p>
          <table>
            <thead>
              <tr>
                <th>🔐 Order ID</th>
                <th>🔐 Item ID</th>
                <th>📦 Item Name</th>
                <th>📦 Category</th>
                <th>📦 Price</th>
                <th>✅ Quantity</th>
              </tr>
            </thead>
            <tbody>
              {nonCompliantTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.order_id}</td>
                  <td>{row.item_id}</td>
                  <td>{row.item_name}</td>
                  <td>{row.category}</td>
                  <td>${row.price.toFixed(2)}</td>
                  <td>{row.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="violation-note">
            Notice how Item Name, Category, and Price depend only on Item ID, 
            not the full composite key (Order ID, Item ID). This violates 2NF.
          </p>
        </div>
      </div>

      <h4>2NF Compliant Tables</h4>
      
      <div className="compliant-section">
        <h5>Orders Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Order ID</th>
                <th>🔗 Customer ID</th>
                <th>✅ Order Date</th>
                <th>✅ Total Amount</th>
                <th>✅ Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.customer_id}</td>
                  <td>{order.order_date}</td>
                  <td>${order.total_amount.toFixed(2)}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Menu Items Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Item ID</th>
                <th>✅ Name</th>
                <th>🔗 Category ID</th>
                <th>✅ Base Price</th>
                <th>✅ Description</th>
              </tr>
            </thead>
            <tbody>
              {menu_items.map((item, index) => (
                <tr key={index}>
                  <td>{item.item_id}</td>
                  <td>{item.name}</td>
                  <td>{item.category_id}</td>
                  <td>${item.base_price.toFixed(2)}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Order Items Table (Junction Table)</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔐 Order ID</th>
                <th>🔐 Item ID</th>
                <th>✅ Quantity</th>
                <th>✅ Price at Time</th>
                <th>✅ Special Instructions</th>
              </tr>
            </thead>
            <tbody>
              {order_items.map((item, index) => (
                <tr key={index}>
                  <td>{item.order_id}</td>
                  <td>{item.item_id}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price_at_time.toFixed(2)}</td>
                  <td>{item.special_instructions || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="explanation">
        <h4>Key 2NF Improvements</h4>
        <ol>
          <li>Item details (name, base price, description) moved to separate Menu Items table</li>
          <li>Categories separated into their own table</li>
          <li>Order Items table now only contains attributes that depend on both Order ID and Item ID</li>
          <li>Price at time stored with order items for historical accuracy</li>
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
      `}</style>
    </div>
  );
};

export default SecondNF;