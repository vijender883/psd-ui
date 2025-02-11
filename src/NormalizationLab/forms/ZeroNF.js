import React from 'react';

const ZeroNF = () => {
  const customerData = [
    {
      customer_name: "John Smith",
      phone_numbers: ["555-0123", "555-0124", "555-0125"],
      addresses: [
        { street: "123 Main St", city: "New York" },
        { street: "456 Park Ave", city: "Boston" }
      ],
      orders: [
        {
          order_id: 1,
          product: "Laptop",
          quantity: 1,
          price: 1000
        },
        {
          order_id: 2,
          product: "Mouse",
          quantity: 2,
          price: 20
        },
        {
          order_id: 3,
          product: "Keyboard",
          quantity: 1,
          price: 50
        }
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Unnormalized Form (0NF)</h3>
        <p className="mb-2">Raw data containing multiple violations of normalization rules:</p>
        <ul className="list-disc pl-6">
          <li>Multi-valued attributes (phone numbers)</li>
          <li>Nested/Complex structures (addresses, orders)</li>
          <li>Repeating groups (order items)</li>
          <li>Non-atomic values (addresses)</li>
          <li>No proper primary key structure</li>
        </ul>
      </div>

      <div className="mb-6 bg-gray-100 p-4 rounded">
        <p className="font-bold">Key:</p>
        <ul className="list-none">
          <li>🔑 - Natural Primary Key</li>
          <li>📦 - Composite/Complex Data</li>
          <li>🔄 - Repeating Groups</li>
          <li>📝 - Non-atomic Values</li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">
                📦 Phone Numbers
                <div className="text-sm text-gray-600">
                  (🔄 Multiple Values)
                </div>
              </th>
              <th className="border p-2">
                📦 Addresses
                <div className="text-sm text-gray-600">
                  (📝 Non-atomic, 🔄 Multiple)
                </div>
              </th>
              <th className="border p-2">
                📦 Orders
                <div className="text-sm text-gray-600">
                  (🔄 Repeating Groups)
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer, index) => (
              <tr key={index}>
                <td className="border p-2">{customer.customer_name}</td>
                <td className="border p-2">
                  {customer.phone_numbers.map((phone, i) => (
                    <div key={i}>{phone}</div>
                  ))}
                </td>
                <td className="border p-2">
                  {customer.addresses.map((addr, i) => (
                    <div key={i}>
                      {addr.street}, {addr.city}
                    </div>
                  ))}
                </td>
                <td className="border p-2">
                  {customer.orders.map((order, i) => (
                    <div key={i} className="mb-2">
                      Order #{order.order_id}:<br />
                      Product: {order.product}<br />
                      Quantity: {order.quantity}<br />
                      Price: ${order.price}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ZeroNF;