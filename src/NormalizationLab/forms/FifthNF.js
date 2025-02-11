// FifthNF.js
import React from 'react';

const FifthNF = () => {
  // Example of a table that violates 5NF
  const violatingTable = {
    name: "Supplier_Item_Kitchen_NonCompliant",
    description: "Violates 5NF due to cyclic join dependency",
    data: [
      { supplier_id: "S001", item_id: "I001", kitchen_id: "K001", 
        delivery_day: "Monday", quality_rating: "A" },
      { supplier_id: "S002", item_id: "I001", kitchen_id: "K001", 
        delivery_day: "Tuesday", quality_rating: "B" },
      { supplier_id: "S001", item_id: "I002", kitchen_id: "K002", 
        delivery_day: "Wednesday", quality_rating: "A" }
    ]
  };

  // Base Tables (5NF Compliant)
  const suppliers = [
    { supplier_id: "S001", name: "Fresh Foods Inc", rating: "A", 
      contact: "John Supplier" },
    { supplier_id: "S002", name: "Quality Grocers", rating: "B", 
      contact: "Mary Vendor" }
  ];

  const items = [
    { item_id: "I001", name: "Fresh Tomatoes", category: "Produce", 
      storage_temp: "4C" },
    { item_id: "I002", name: "Mozzarella", category: "Dairy", 
      storage_temp: "2C" }
  ];

  const kitchens = [
    { kitchen_id: "K001", name: "Main Kitchen", location: "Ground Floor" },
    { kitchen_id: "K002", name: "Prep Kitchen", location: "Basement" }
  ];

  // Relationship Tables (5NF Compliant)
  const supplier_items = [
    { supplier_id: "S001", item_id: "I001", base_price: 2.50, 
      min_order: 10, lead_time: "2 days" },
    { supplier_id: "S002", item_id: "I001", base_price: 2.75, 
      min_order: 5, lead_time: "1 day" }
  ];

  const kitchen_items = [
    { kitchen_id: "K001", item_id: "I001", par_level: 50, 
      reorder_point: 20, storage_location: "Shelf A1" },
    { kitchen_id: "K002", item_id: "I002", par_level: 30, 
      reorder_point: 10, storage_location: "Fridge B2" }
  ];

  const supplier_kitchens = [
    { supplier_id: "S001", kitchen_id: "K001", delivery_schedule: "Mon,Wed,Fri", 
      delivery_window: "6AM-8AM" },
    { supplier_id: "S002", kitchen_id: "K001", delivery_schedule: "Tue,Thu", 
      delivery_window: "7AM-9AM" }
  ];

  // Additional Reference Tables
  const quality_checks = [
    { check_id: "QC001", supplier_id: "S001", item_id: "I001", 
      date: "2024-02-11", score: 95, inspector: "Jane Quality" },
    { check_id: "QC002", supplier_id: "S002", item_id: "I001", 
      date: "2024-02-11", score: 88, inspector: "Bob Inspector" }
  ];

  const price_history = [
    { history_id: "PH001", supplier_id: "S001", item_id: "I001", 
      price: 2.50, effective_date: "2024-01-01" },
    { history_id: "PH002", supplier_id: "S001", item_id: "I001", 
      price: 2.75, effective_date: "2024-02-01" }
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
          suppliers, items, and kitchens:
        </p>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>❌ Supplier ID</th>
                <th>❌ Item ID</th>
                <th>❌ Kitchen ID</th>
                <th>Delivery Day</th>
                <th>Quality Rating</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.supplier_id}</td>
                  <td>{row.item_id}</td>
                  <td>{row.kitchen_id}</td>
                  <td>{row.delivery_day}</td>
                  <td>{row.quality_rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="join-dependencies">
          Join Dependencies:
          <ul>
            <li>Supplier ↺ Item (supplier can provide multiple items)</li>
            <li>Item ↺ Kitchen (items can be used in multiple kitchens)</li>
            <li>Kitchen ↺ Supplier (kitchens can receive from multiple suppliers)</li>
          </ul>
        </p>
      </div>

      <h4>5NF Compliant Tables</h4>

      {/* Base Tables Section */}
      <div className="compliant-section">
        <h5>Base Tables</h5>
        
        <h6>Suppliers</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Supplier ID</th>
                <th>Name</th>
                <th>Rating</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{supplier.supplier_id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.rating}</td>
                  <td>{supplier.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h6>Items</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Item ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Storage Temp</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.item_id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.storage_temp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Binary Relationship Tables */}
      <div className="compliant-section">
        <h5>Binary Relationships (5NF Compliant)</h5>
        
        <h6>Supplier-Item Relationships</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔐 Supplier ID</th>
                <th>🔐 Item ID</th>
                <th>Base Price</th>
                <th>Min Order</th>
                <th>Lead Time</th>
              </tr>
            </thead>
            <tbody>
              {supplier_items.map((si, index) => (
                <tr key={index}>
                  <td>{si.supplier_id}</td>
                  <td>{si.item_id}</td>
                  <td>${si.base_price}</td>
                  <td>{si.min_order}</td>
                  <td>{si.lead_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h6>Kitchen-Item Relationships</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔐 Kitchen ID</th>
                <th>🔐 Item ID</th>
                <th>Par Level</th>
                <th>Reorder Point</th>
                <th>Storage Location</th>
              </tr>
            </thead>
            <tbody>
              {kitchen_items.map((ki, index) => (
                <tr key={index}>
                  <td>{ki.kitchen_id}</td>
                  <td>{ki.item_id}</td>
                  <td>{ki.par_level}</td>
                  <td>{ki.reorder_point}</td>
                  <td>{ki.storage_location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical/Audit Tables */}
      <div className="compliant-section">
        <h5>Historical Records (Supporting Tables)</h5>
        
        <h6>Quality Checks</h6>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Check ID</th>
                <th>🔗 Supplier ID</th>
                <th>🔗 Item ID</th>
                <th>Date</th>
                <th>Score</th>
                <th>Inspector</th>
              </tr>
            </thead>
            <tbody>
              {quality_checks.map((qc, index) => (
                <tr key={index}>
                  <td>{qc.check_id}</td>
                  <td>{qc.supplier_id}</td>
                  <td>{qc.item_id}</td>
                  <td>{qc.date}</td>
                  <td>{qc.score}</td>
                  <td>{qc.inspector}</td>
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
        h6 {
          color: #2563eb;
          margin: 20px 0 10px 0;
        }
      `}</style>
    </div>
  );
};

export default FifthNF;