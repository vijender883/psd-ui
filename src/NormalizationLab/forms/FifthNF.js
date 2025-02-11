import React from 'react';

const FifthNF = () => {
  // Example of a table that violates 5NF
  const violatingTable = {
    name: "Customer_Product_Order_NonCompliant",
    description: "Violates 5NF due to cyclic join dependency",
    data: [
      { customer_id: 1, product_id: "P1", order_id: 1, 
        order_date: "2025-02-11", category: "Electronics" },
      { customer_id: 1, product_id: "P2", order_id: 2, 
        order_date: "2025-02-11", category: "Accessories" },
      { customer_id: 1, product_id: "P3", order_id: 3, 
        order_date: "2025-02-11", category: "Accessories" }
    ]
  };

  // Base Tables (5NF Compliant)
  const customers = [
    { customer_id: 1, customer_name: "John Smith", join_date: "2025-01-01" }
  ];

  const products = [
    { product_id: "P1", product_name: "Laptop", category_id: "CAT1", unit_price: 1000 },
    { product_id: "P2", product_name: "Mouse", category_id: "CAT2", unit_price: 20 },
    { product_id: "P3", product_name: "Keyboard", category_id: "CAT2", unit_price: 50 }
  ];

  const categories = [
    { category_id: "CAT1", category_name: "Electronics", type: "Hardware" },
    { category_id: "CAT2", category_name: "Accessories", type: "Peripherals" }
  ];

  // Relationship Tables (5NF Compliant)
  const customer_preferences = [
    { customer_id: 1, category_id: "CAT1", preference_level: "High" },
    { customer_id: 1, category_id: "CAT2", preference_level: "Medium" }
  ];

  const orders = [
    { order_id: 1, customer_id: 1, order_date: "2025-02-11", status_id: "S1" },
    { order_id: 2, customer_id: 1, order_date: "2025-02-11", status_id: "S2" },
    { order_id: 3, customer_id: 1, order_date: "2025-02-11", status_id: "S3" }
  ];

  const order_details = [
    { order_detail_id: "OD1", order_id: 1, product_id: "P1", quantity: 1, unit_price_at_order: 1000 },
    { order_detail_id: "OD2", order_id: 2, product_id: "P2", quantity: 2, unit_price_at_order: 20 },
    { order_detail_id: "OD3", order_id: 3, product_id: "P3", quantity: 1, unit_price_at_order: 50 }
  ];

  // Additional Reference Tables
  const order_status = [
    { status_id: "S1", status_name: "Pending" },
    { status_id: "S2", status_name: "Shipped" },
    { status_id: "S3", status_name: "Delivered" }
  ];

  const price_history = [
    { history_id: "PH1", product_id: "P1", price: 1000, effective_date: "2025-01-01" },
    { history_id: "PH2", product_id: "P2", price: 20, effective_date: "2025-01-01" },
    { history_id: "PH3", product_id: "P3", price: 50, effective_date: "2025-01-01" }
  ];

  return (
    <div>
      <div className="description">
        <h3>Fifth Normal Form (5NF)</h3>
        <p>Also known as Project-Join Normal Form (PJNF):</p>
        <ul>
          <li>Must be in 4NF</li>
          <li>Every join dependency must be implied by candidate keys</li>
          <li>Cannot be decomposed further without losing information</li>
          <li>Handles cases where cyclic relationships exist between entities</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>🔐 - Composite Primary Key</li>
          <li>↺ - Join Dependency</li>
          <li>❌ - 5NF Violation</li>
        </ul>
      </div>

      <div className="example-violation">
        <h4>Example of 5NF Violation</h4>
        <p className="violation-note">
          This table violates 5NF because it contains a cyclic relationship between 
          customers, products, and orders:
        </p>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>❌ Customer ID</th>
                <th>❌ Product ID</th>
                <th>❌ Order ID</th>
                <th>Order Date</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.customer_id}</td>
                  <td>{row.product_id}</td>
                  <td>{row.order_id}</td>
                  <td>{row.order_date}</td>
                  <td>{row.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="join-dependencies">
          Join Dependencies:
          <ul>
            <li>Customer ↺ Product (customer can order multiple products)</li>
            <li>Product ↺ Order (products can be in multiple orders)</li>
            <li>Order ↺ Customer (orders belong to customers)</li>
          </ul>
        </p>
      </div>

      <h4>5NF Compliant Tables</h4>

      {/* Base Tables Section */}
      <div className="compliant-section">
        <h5>Base Tables</h5>
        
        <h6>Customers</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Customer ID</th>
                <th>Customer Name</th>
                <th>Join Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.customer_id}</td>
                  <td>{customer.customer_name}</td>
                  <td>{customer.join_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h6>Products</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Product ID</th>
                <th>Product Name</th>
                <th>🔗 Category ID</th>
                <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.product_id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.category_id}</td>
                  <td>${product.unit_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h6>Categories</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Category ID</th>
                <th>Category Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.category_id}</td>
                  <td>{category.category_name}</td>
                  <td>{category.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Binary Relationship Tables */}
      <div className="compliant-section">
        <h5>Binary Relationships (5NF Compliant)</h5>
        
        <h6>Customer Preferences</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔐 Customer ID</th>
                <th>🔐 Category ID</th>
                <th>Preference Level</th>
              </tr>
            </thead>
            <tbody>
              {customer_preferences.map((pref, index) => (
                <tr key={index}>
                  <td>{pref.customer_id}</td>
                  <td>{pref.category_id}</td>
                  <td>{pref.preference_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h6>Orders</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Order ID</th>
                <th>🔗 Customer ID</th>
                <th>Order Date</th>
                <th>🔗 Status ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.customer_id}</td>
                  <td>{order.order_date}</td>
                  <td>{order.status_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h6>Order Details</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Order Detail ID</th>
                <th>🔗 Order ID</th>
                <th>🔗 Product ID</th>
                <th>Quantity</th>
                <th>Unit Price at Order</th>
              </tr>
            </thead>
            <tbody>
              {order_details.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.order_detail_id}</td>
                  <td>{detail.order_id}</td>
                  <td>{detail.product_id}</td>
                  <td>{detail.quantity}</td>
                  <td>${detail.unit_price_at_order}</td>
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
        .join-dependencies {
          color: #666;
          margin-top: 15px;
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

export default FifthNF;