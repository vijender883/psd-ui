import React from 'react';

const BCNF = () => {
  // Example of a table that violates BCNF
  const violatingTable = {
    name: "Product_Categories_NonCompliant",
    description: "Violates BCNF because category determines product type but isn't a key",
    data: [
      { product_id: "P1", category_id: "CAT1", product_name: "Laptop", 
        category_name: "Electronics", category_type: "Hardware" },
      { product_id: "P2", category_id: "CAT2", product_name: "Mouse", 
        category_name: "Accessories", category_type: "Peripherals" },
      { product_id: "P3", category_id: "CAT2", product_name: "Keyboard", 
        category_name: "Accessories", category_type: "Peripherals" }
    ]
  };

  // BCNF Compliant Tables
  const product_categories = [
    { category_id: "CAT1", category_name: "Electronics", category_type: "Hardware" },
    { category_id: "CAT2", category_name: "Accessories", category_type: "Peripherals" }
  ];

  const products = [
    { product_id: "P1", product_name: "Laptop", category_id: "CAT1", unit_price: 1000 },
    { product_id: "P2", product_name: "Mouse", category_id: "CAT2", unit_price: 20 },
    { product_id: "P3", product_name: "Keyboard", category_id: "CAT2", unit_price: 50 }
  ];

  const order_status = [
    { status_id: "S1", status_name: "Pending" },
    { status_id: "S2", status_name: "Shipped" },
    { status_id: "S3", status_name: "Delivered" }
  ];

  const orders = [
    { order_id: 1, customer_id: 1, order_date: "2025-02-11", status_id: "S1" },
    { order_id: 2, customer_id: 1, order_date: "2025-02-11", status_id: "S2" },
    { order_id: 3, customer_id: 1, order_date: "2025-02-11", status_id: "S3" }
  ];

  const order_details = [
    { order_detail_id: "OD1", order_id: 1, product_id: "P1", quantity: 1, 
      unit_price_at_order: 1000 },
    { order_detail_id: "OD2", order_id: 2, product_id: "P2", quantity: 2, 
      unit_price_at_order: 20 },
    { order_detail_id: "OD3", order_id: 3, product_id: "P3", quantity: 1, 
      unit_price_at_order: 50 }
  ];

  return (
    <div>
      <div className="description">
        <h3>Boyce-Codd Normal Form (BCNF)</h3>
        <p>Stricter version of 3NF where:</p>
        <ul>
          <li>Must be in 3NF</li>
          <li>For every non-trivial functional dependency X → Y, X must be a superkey</li>
          <li>Every determinant must be a candidate key</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>🎯 - Determinant (Non-key in violation)</li>
          <li>❌ - BCNF Violation</li>
        </ul>
      </div>

      <div className="example-violation">
        <h4>Example of BCNF Violation</h4>
        <p className="violation-note">
          This table violates BCNF because category determines category type, 
          but category_id is not a candidate key for the full table:
        </p>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Product ID</th>
                <th>🎯 Category ID</th>
                <th>Product Name</th>
                <th>❌ Category Name</th>
                <th>❌ Category Type</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.product_id}</td>
                  <td>{row.category_id}</td>
                  <td>{row.product_name}</td>
                  <td>{row.category_name}</td>
                  <td>{row.category_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="violation-explanation">
          Functional dependency: category_id → category_name, category_type <br/>
          This violates BCNF because category_id is not a superkey
        </p>
      </div>

      <h4>BCNF Compliant Tables</h4>

      <div className="compliant-section">
        <h5>Product Categories Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Category ID</th>
                <th>Category Name</th>
                <th>Category Type</th>
              </tr>
            </thead>
            <tbody>
              {product_categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.category_id}</td>
                  <td>{category.category_name}</td>
                  <td>{category.category_type}</td>
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

        <h5>Order Status Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Status ID</th>
                <th>Status Name</th>
              </tr>
            </thead>
            <tbody>
              {order_status.map((status, index) => (
                <tr key={index}>
                  <td>{status.status_id}</td>
                  <td>{status.status_name}</td>
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

        <h5>Order Details Table</h5>
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
        .violation-explanation {
          color: #666;
          margin-top: 10px;
          font-style: italic;
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

export default BCNF;