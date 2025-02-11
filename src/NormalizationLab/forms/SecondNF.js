// SecondNF.js
import React from 'react';

const SecondNF = () => {
  // Example of a table that would violate 2NF
  const violatingTable = {
    name: "Order_Items_NonCompliant",
    description: "Violates 2NF because item details depend only on Item ID, not the full key",
    data: [
      { order_id: "ORD001", item_id: "I001", quantity: 2, item_name: "Pizza Margherita", 
        item_category: "Pizza", base_price: 15.00 },
      { order_id: "ORD002", item_id: "I001", quantity: 1, item_name: "Pizza Margherita", 
        item_category: "Pizza", base_price: 15.00 }
    ]
  };

  // 2NF Compliant Tables
  const menu_items = [
    { item_id: "I001", name: "Pizza Margherita", category_id: "CAT1", 
      description: "Fresh tomatoes, mozzarella, basil", base_price: 15.00 },
    { item_id: "I002", name: "Coca Cola", category_id: "CAT2", 
      description: "330ml can", base_price: 2.00 },
    { item_id: "I003", name: "Pasta Carbonara", category_id: "CAT3", 
      description: "Creamy pasta with bacon", base_price: 18.00 }
  ];

  const categories = [
    { category_id: "CAT1", name: "Pizza", kitchen_section: "Hot Kitchen" },
    { category_id: "CAT2", name: "Beverages", kitchen_section: "Cold Station" },
    { category_id: "CAT3", name: "Pasta", kitchen_section: "Hot Kitchen" }
  ];

  const orders = [
    { order_id: "ORD001", customer_id: "C001", server_id: "S001", 
      order_date: "2024-02-11", order_time: "14:30", status: "Completed" },
    { order_id: "ORD002", customer_id: "C002", server_id: "S001", 
      order_date: "2024-02-11", order_time: "18:45", status: "In Progress" }
  ];

  const order_items = [
    { order_id: "ORD001", item_id: "I001", quantity: 2, price_at_time: 15.00, 
      special_instructions: "Extra cheese" },
    { order_id: "ORD001", item_id: "I002", quantity: 3, price_at_time: 2.00, 
      special_instructions: null },
    { order_id: "ORD002", item_id: "I001", quantity: 1, price_at_time: 15.00, 
      special_instructions: "Well done" }
  ];

  const servers = [
    { server_id: "S001", name: "Alice Johnson", hire_date: "2024-01-15" }
  ];

  const server_sections = [
    { server_id: "S001", section_id: "SEC1", assignment_date: "2024-02-11" }
  ];

  const sections = [
    { section_id: "SEC1", name: "Main Dining", capacity: 50 }
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
          <p className="violation-note">This structure violates 2NF because item details depend only on Item ID, not the full composite key (Order ID, Item ID):</p>
          <table>
            <thead>
              <tr>
                <th>🔐 Order ID</th>
                <th>🔐 Item ID</th>
                <th>Quantity</th>
                <th>📦 Item Name</th>
                <th>📦 Item Category</th>
                <th>📦 Base Price</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.order_id}</td>
                  <td>{row.item_id}</td>
                  <td>{row.quantity}</td>
                  <td>{row.item_name}</td>
                  <td>{row.item_category}</td>
                  <td>${row.base_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h4>2NF Compliant Tables</h4>

      <div className="compliant-section">
        <h5>Menu Items Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Item ID</th>
                <th>Name</th>
                <th>🔗 Category ID</th>
                <th>Description</th>
                <th>Base Price</th>
              </tr>
            </thead>
            <tbody>
              {menu_items.map((item, index) => (
                <tr key={index}>
                  <td>{item.item_id}</td>
                  <td>{item.name}</td>
                  <td>{item.category_id}</td>
                  <td>{item.description}</td>
                  <td>${item.base_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Order Items Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔐 Order ID</th>
                <th>🔐 Item ID</th>
                <th>Quantity</th>
                <th>Price at Time</th>
                <th>Special Instructions</th>
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

        <h5>Categories Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Category ID</th>
                <th>Name</th>
                <th>Kitchen Section</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.category_id}</td>
                  <td>{category.name}</td>
                  <td>{category.kitchen_section}</td>
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