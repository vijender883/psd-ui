// ZeroNF.js
import React from 'react';

const ZeroNF = () => {
  const restaurantData = [
    {
      order_id: "ORD001",
      order_date: "2024-02-11 14:30",
      customer_info: {
        name: "John Doe",
        phones: ["123-456-7890", "987-654-3210"],
        address: "123 Main St, City, State, 12345",
        email: "john@email.com, john.work@email.com"
      },
      order_details: {
        items: [
          { name: "Pizza Margherita", quantity: 2, price: 15.00, customization: "Extra cheese, No basil" },
          { name: "Coca Cola", quantity: 3, price: 2.00, size: "Large" }
        ],
        special_instructions: "Deliver to back door\nCall upon arrival"
      },
      server_info: {
        id: "S001",
        name: "Alice Johnson",
        shift: "Evening (4 PM - 12 AM)",
        section: "Main Dining, Patio",
        certifications: "Food Safety, Alcohol Service"
      },
      payment_info: {
        methods: ["Credit Card *1234", "Gift Card *5678"],
        subtotal: 36.00,
        tax: 3.60,
        tip: 8.00,
        loyalty_points: "Earn: 36 points, Current Balance: 150"
      }
    },
    {
      order_id: "ORD002",
      order_date: "2024-02-11 18:45",
      customer_info: {
        name: "Jane Smith",
        phones: ["555-123-4567"],
        address: "456 Oak Ave, City, State, 12345",
        email: "jane@email.com"
      },
      order_details: {
        items: [
          { name: "Pasta Carbonara", quantity: 1, price: 18.00, customization: "Light sauce" },
          { name: "Garlic Bread", quantity: 1, price: 5.00 },
          { name: "House Wine", quantity: 1, price: 25.00, type: "Red, Merlot" }
        ],
        special_instructions: "Allergic to nuts"
      },
      server_info: {
        id: "S001",
        name: "Alice Johnson",
        shift: "Evening (4 PM - 12 AM)",
        section: "Main Dining",
        certifications: "Food Safety, Alcohol Service"
      },
      payment_info: {
        methods: ["Cash"],
        subtotal: 48.00,
        tax: 4.80,
        tip: 10.00,
        loyalty_points: "Earn: 48 points"
      }
    }
  ];

  return (
    <div>
      <div className="description">
        <h3>Unnormalized Form (0NF)</h3>
        <p>Raw data containing multiple violations of normalization rules:</p>
        <ul>
          <li>Multi-valued attributes (phone numbers, email addresses)</li>
          <li>Nested/Complex structures (order details, payment info)</li>
          <li>Repeating groups (order items)</li>
          <li>Non-atomic values (addresses, certifications)</li>
          <li>Mixed data types (payment methods)</li>
          <li>Redundant information (server details)</li>
        </ul>
      </div>

      <div className="legend">
        <p><strong>Key:</strong></p>
        <ul>
          <li>🔑 - Natural Primary Key</li>
          <li>📦 - Composite/Complex Data</li>
          <li>🔄 - Repeating Groups</li>
          <li>📝 - Non-atomic Values</li>
          <li>🔗 - Would be Foreign Key in normalized form</li>
        </ul>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>🔑 Order ID</th>
              <th>Order Date</th>
              <th>📦 Customer Information
                <div className="subheader">
                  (Contains: 📝 Name, 🔄 Phones, 📝 Address, 🔄 Emails)
                </div>
              </th>
              <th>📦 Order Details
                <div className="subheader">
                  (Contains: 🔄 Items, 📝 Special Instructions)
                </div>
              </th>
              <th>📦 Server Information
                <div className="subheader">
                  (Contains: 🔗 ID, Name, 📝 Shift, 🔄 Section, 📝 Certifications)
                </div>
              </th>
              <th>📦 Payment Information
                <div className="subheader">
                  (Contains: 🔄 Methods, Amounts, 📝 Loyalty Info)
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {restaurantData.map((row, index) => (
              <tr key={index}>
                <td>{row.order_id}</td>
                <td>{row.order_date}</td>
                <td>
                  Name: {row.customer_info.name}<br/>
                  Phones: {row.customer_info.phones.join(', ')}<br/>
                  Address: {row.customer_info.address}<br/>
                  Email: {row.customer_info.email}
                </td>
                <td>
                  Items:<br/>
                  {row.order_details.items.map((item, i) => (
                    <div key={i}>
                      - {item.name} (x{item.quantity}) ${item.price}
                      {item.customization && <><br/>&nbsp;&nbsp;Note: {item.customization}</>}
                    </div>
                  ))}
                  <br/>
                  Instructions: {row.order_details.special_instructions}
                </td>
                <td>
                  ID: {row.server_info.id}<br/>
                  Name: {row.server_info.name}<br/>
                  Shift: {row.server_info.shift}<br/>
                  Section: {row.server_info.section}<br/>
                  Certs: {row.server_info.certifications}
                </td>
                <td>
                  Methods: {row.payment_info.methods.join(', ')}<br/>
                  Subtotal: ${row.payment_info.subtotal}<br/>
                  Tax: ${row.payment_info.tax}<br/>
                  Tip: ${row.payment_info.tip}<br/>
                  Loyalty: {row.payment_info.loyalty_points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .subheader {
          font-size: 0.8em;
          color: #666;
          font-weight: normal;
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
      `}</style>
    </div>
  );
};

export default ZeroNF;