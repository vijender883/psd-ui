import React from 'react';

const ThirdNF = () => {
  // Example of a table that violates 3NF
  const violatingTable = {
    name: "Customer_Orders_NonCompliant",
    description: "Violates 3NF due to transitive dependencies",
    data: [
      { order_id: 1, customer_id: 1, customer_name: "John Smith", 
        city_id: "C1", city_name: "New York", country: "USA",
        product_id: "P1", product_name: "Laptop", category: "Electronics" },
      { order_id: 2, customer_id: 1, customer_name: "John Smith", 
        city_id: "C2", city_name: "Boston", country: "USA",
        product_id: "P2", product_name: "Mouse", category: "Accessories" }
    ]
  };

  // 3NF Compliant Tables
  const customers = [
    { customer_id: 1, customer_name: "John Smith" }
  ];

  const phone_numbers = [
    { phone_id: "PH1", customer_id: 1, phone_number: "555-0123" },
    { phone_id: "PH2", customer_id: 1, phone_number: "555-0124" },
    { phone_id: "PH3", customer_id: 1, phone_number: "555-0125" }
  ];

  const cities = [
    { city_id: "C1", city_name: "New York", country: "USA" },
    { city_id: "C2", city_name: "Boston", country: "USA" }
  ];

  const addresses = [
    { address_id: "A1", customer_id: 1, street_address: "123 Main St", city_id: "C1" },
    { address_id: "A2", customer_id: 1, street_address: "456 Park Ave", city_id: "C2" }
  ];

  const products = [
    { product_id: "P1", product_name: "Laptop", category_id: "CAT1", unit_price: 1000 },
    { product_id: "P2", product_name: "Mouse", category_id: "CAT2", unit_price: 20 },
    { product_id: "P3", product_name: "Keyboard", category_id: "CAT2", unit_price: 50 }
  ];

  const categories = [
    { category_id: "CAT1", category_name: "Electronics" },
    { category_id: "CAT2", category_name: "Accessories" }
  ];

  const orders = [
    { order_id: 1, customer_id: 1, order_date: "2025-02-11" },
    { order_id: 2, customer_id: 1, order_date: "2025-02-11" },
    { order_id: 3, customer_id: 1, order_date: "2025-02-11" }
  ];

  const order_details = [
    { order_detail_id: "OD1", order_id: 1, product_id: "P1", quantity: 1 },
    { order_detail_id: "OD2", order_id: 2, product_id: "P2", quantity: 2 },
    { order_detail_id: "OD3", order_id: 3, product_id: "P3", quantity: 1 }
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
          <li>customer_id → city_id → city_name → country</li>
          <li>product_id → category_id → category_name</li>
        </ul>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Order ID</th>
                <th>🔗 Customer ID</th>
                <th>➡️ Customer Name</th>
                <th>➡️ City ID</th>
                <th>➡️ City Name</th>
                <th>➡️ Country</th>
                <th>🔗 Product ID</th>
                <th>➡️ Product Name</th>
                <th>➡️ Category</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.order_id}</td>
                  <td>{row.customer_id}</td>
                  <td>{row.customer_name}</td>
                  <td>{row.city_id}</td>
                  <td>{row.city_name}</td>
                  <td>{row.country}</td>
                  <td>{row.product_id}</td>
                  <td>{row.product_name}</td>
                  <td>{row.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h4>3NF Compliant Tables</h4>

      <div className="compliant-section">
        <h5>Customers Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Customer ID</th>
                <th>✅ Customer Name</th>
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
                <th>🔑 Phone ID</th>
                <th>🔗 Customer ID</th>
                <th>✅ Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {phone_numbers.map((phone, index) => (
                <tr key={index}>
                  <td>{phone.phone_id}</td>
                  <td>{phone.customer_id}</td>
                  <td>{phone.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Cities Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 City ID</th>
                <th>✅ City Name</th>
                <th>✅ Country</th>
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

        <h5>Addresses Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Address ID</th>
                <th>🔗 Customer ID</th>
                <th>✅ Street Address</th>
                <th>🔗 City ID</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address, index) => (
                <tr key={index}>
                  <td>{address.address_id}</td>
                  <td>{address.customer_id}</td>
                  <td>{address.street_address}</td>
                  <td>{address.city_id}</td>
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
                <th>✅ Category Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.category_id}</td>
                  <td>{category.category_name}</td>
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
                <th>✅ Product Name</th>
                <th>🔗 Category ID</th>
                <th>✅ Unit Price</th>
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

        <h5>Orders Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Order ID</th>
                <th>🔗 Customer ID</th>
                <th>✅ Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.customer_id}</td>
                  <td>{order.order_date}</td>
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
                <th>✅ Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order_details.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.order_detail_id}</td>
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