import React from 'react';

const FirstNF = () => {
  // Added menu_items table
  const menu_items = [
    { item_id: "I001", name: "Pizza Margherita", category: "Pizza", 
      description: "Fresh tomatoes, mozzarella, and basil", 
      base_price: 15.00, is_available: true },
    { item_id: "I002", name: "Coca Cola", category: "Beverages", 
      description: "330ml can", 
      base_price: 2.00, is_available: true },
    { item_id: "I003", name: "Pasta Carbonara", category: "Pasta", 
      description: "Creamy sauce with pancetta and parmesan", 
      base_price: 18.00, is_available: true }
  ];

  const servers = [
    { server_id: "S001", name: "Alice Johnson", hire_date: "2024-01-15", 
      phone: "555-777-8888", email: "alice@restaurant.com" },
    { server_id: "S002", name: "Bob Wilson", hire_date: "2024-01-20", 
      phone: "555-777-9999", email: "bob@restaurant.com" }
  ];

  const customers = [
    { customer_id: "C001", name: "John Doe", address_street: "123 Main St", 
      address_city: "City", address_state: "State", address_zip: "12345" },
    { customer_id: "C002", name: "Jane Smith", address_street: "456 Oak Ave", 
      address_city: "City", address_state: "State", address_zip: "12345" }
  ];

  const customer_phones = [
    { customer_id: "C001", phone_id: "P001", phone_number: "123-456-7890", phone_type: "Primary" },
    { customer_id: "C001", phone_id: "P002", phone_number: "987-654-3210", phone_type: "Secondary" },
    { customer_id: "C002", phone_id: "P003", phone_number: "555-123-4567", phone_type: "Primary" }
  ];

  const customer_emails = [
    { customer_id: "C001", email_id: "E001", email: "john@email.com", email_type: "Personal" },
    { customer_id: "C001", email_id: "E002", email: "john.work@email.com", email_type: "Work" },
    { customer_id: "C002", email_id: "E003", email: "jane@email.com", email_type: "Personal" }
  ];

  const orders = [
    { order_id: "ORD001", customer_id: "C001", server_id: "S001", 
      order_date: "2024-02-11", order_time: "14:30", 
      special_instructions: "Deliver to back door" },
    { order_id: "ORD002", customer_id: "C002", server_id: "S001", 
      order_date: "2024-02-11", order_time: "18:45", 
      special_instructions: "Allergic to nuts" }
  ];

  const order_items = [
    { order_id: "ORD001", item_id: "I001", quantity: 2, unit_price: 15.00, 
      customization: "Extra cheese" },
    { order_id: "ORD001", item_id: "I002", quantity: 3, unit_price: 2.00, 
      customization: null },
    { order_id: "ORD002", item_id: "I003", quantity: 1, unit_price: 18.00, 
      customization: "Light sauce" }
  ];

  const order_payments = [
    { payment_id: "PAY001", order_id: "ORD001", payment_method: "Credit Card",
      card_last_four: "1234", amount: 36.00, payment_date: "2024-02-11" },
    { payment_id: "PAY002", order_id: "ORD001", payment_method: "Gift Card",
      card_last_four: "5678", amount: 3.60, payment_date: "2024-02-11" },
    { payment_id: "PAY003", order_id: "ORD002", payment_method: "Cash",
      amount: 48.00, payment_date: "2024-02-11" }
  ];

  return (
    <div>
      <div className="description">
        <h3>First Normal Form (1NF)</h3>
        <p>Data has been normalized to ensure:</p>
        <ul>
          <li>Each column contains atomic values (no arrays or nested structures)</li>
          <li>No repeating groups (each attribute contains a single value)</li>
          <li>Each record is unique and identified by a primary key</li>
          <li>All values in a column are of the same domain</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key Notation:</strong></p>
        <ul>
          <li>🔑 - Primary Key</li>
          <li>🔗 - Foreign Key</li>
          <li>🔐 - Composite Primary Key (both parts required for uniqueness)</li>
        </ul>
      </div>

      <h4>Menu Items Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Item ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Base Price</th>
              <th>Is Available</th>
            </tr>
          </thead>
          <tbody>
            {menu_items.map((item, index) => (
              <tr key={index}>
                <td>{item.item_id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>${item.base_price.toFixed(2)}</td>
                <td>{item.is_available ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Servers Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Server ID</th>
              <th>Name</th>
              <th>Hire Date</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server, index) => (
              <tr key={index}>
                <td>{server.server_id}</td>
                <td>{server.name}</td>
                <td>{server.hire_date}</td>
                <td>{server.phone}</td>
                <td>{server.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Customers Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Customer ID</th>
              <th>Name</th>
              <th>Address Street</th>
              <th>Address City</th>
              <th>Address State</th>
              <th>Address ZIP</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.customer_id}</td>
                <td>{customer.name}</td>
                <td>{customer.address_street}</td>
                <td>{customer.address_city}</td>
                <td>{customer.address_state}</td>
                <td>{customer.address_zip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Customer Phones Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Phone ID</th>
              <th>🔗 Customer ID</th>
              <th>Phone Number</th>
              <th>Phone Type</th>
            </tr>
          </thead>
          <tbody>
            {customer_phones.map((phone, index) => (
              <tr key={index}>
                <td>{phone.phone_id}</td>
                <td>{phone.customer_id}</td>
                <td>{phone.phone_number}</td>
                <td>{phone.phone_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Customer Emails Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Email ID</th>
              <th>🔗 Customer ID</th>
              <th>Email</th>
              <th>Email Type</th>
            </tr>
          </thead>
          <tbody>
            {customer_emails.map((email, index) => (
              <tr key={index}>
                <td>{email.email_id}</td>
                <td>{email.customer_id}</td>
                <td>{email.email}</td>
                <td>{email.email_type}</td>
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
              <th>🔗 Server ID</th>
              <th>Order Date</th>
              <th>Order Time</th>
              <th>Special Instructions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.order_id}</td>
                <td>{order.customer_id}</td>
                <td>{order.server_id}</td>
                <td>{order.order_date}</td>
                <td>{order.order_time}</td>
                <td>{order.special_instructions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Order Items Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔐 Order ID</th>
              <th>🔐 Item ID</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Customization</th>
            </tr>
          </thead>
          <tbody>
            {order_items.map((item, index) => (
              <tr key={index}>
                <td>{item.order_id}</td>
                <td>{item.item_id}</td>
                <td>{item.quantity}</td>
                <td>${item.unit_price.toFixed(2)}</td>
                <td>{item.customization || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Order Payments Table</h4>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Payment ID</th>
              <th>🔗 Order ID</th>
              <th>Payment Method</th>
              <th>Card Last Four</th>
              <th>Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {order_payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.payment_id}</td>
                <td>{payment.order_id}</td>
                <td>{payment.payment_method}</td>
                <td>{payment.card_last_four || '-'}</td>
                <td>${payment.amount.toFixed(2)}</td>
                <td>{payment.payment_date}</td>
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