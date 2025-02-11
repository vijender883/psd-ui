// BCNF.js
import React from 'react';

const BCNF = () => {
  // Example of a table that violates BCNF
  const violatingTable = {
    name: "Course_Instructor_NonCompliant",
    description: "Violates BCNF because instructor determines subject but isn't a key",
    data: [
      { course_id: "C001", instructor_id: "I001", subject: "Italian Cuisine", 
        time_slot: "Morning", room: "Kitchen 1" },
      { course_id: "C002", instructor_id: "I001", subject: "Italian Cuisine", 
        time_slot: "Evening", room: "Kitchen 2" },
      { course_id: "C003", instructor_id: "I002", subject: "French Cuisine", 
        time_slot: "Morning", room: "Kitchen 1" }
    ]
  };

  // BCNF Compliant Tables
  const instructors = [
    { instructor_id: "I001", name: "Chef Mario", specialty: "Italian Cuisine", 
      certification_level: "Master" },
    { instructor_id: "I002", name: "Chef Pierre", specialty: "French Cuisine", 
      certification_level: "Master" }
  ];

  const instructor_subjects = [
    { instructor_id: "I001", subject_id: "S001" },
    { instructor_id: "I002", subject_id: "S002" }
  ];

  const subjects = [
    { subject_id: "S001", name: "Italian Cuisine", description: "Traditional Italian cooking" },
    { subject_id: "S002", name: "French Cuisine", description: "Classic French techniques" }
  ];

  const courses = [
    { course_id: "C001", subject_id: "S001", instructor_id: "I001", 
      time_slot: "Morning", room: "Kitchen 1", start_date: "2024-03-01" },
    { course_id: "C002", subject_id: "S001", instructor_id: "I001", 
      time_slot: "Evening", room: "Kitchen 2", start_date: "2024-03-01" }
  ];

  const certifications = [
    { certification_id: "CERT001", name: "Master Italian Chef", 
      issuing_body: "Italian Culinary Institute" },
    { certification_id: "CERT002", name: "Master French Chef", 
      issuing_body: "French Culinary Institute" }
  ];

  const instructor_certifications = [
    { instructor_id: "I001", certification_id: "CERT001", 
      date_earned: "2020-01-15", valid_until: "2025-01-15" },
    { instructor_id: "I002", certification_id: "CERT002", 
      date_earned: "2019-06-20", valid_until: "2024-06-20" }
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
          This table violates BCNF because instructor determines subject, 
          but instructor_id is not a candidate key:
        </p>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Course ID</th>
                <th>🎯 Instructor ID</th>
                <th>❌ Subject</th>
                <th>Time Slot</th>
                <th>Room</th>
              </tr>
            </thead>
            <tbody>
              {violatingTable.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.course_id}</td>
                  <td>{row.instructor_id}</td>
                  <td>{row.subject}</td>
                  <td>{row.time_slot}</td>
                  <td>{row.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="violation-explanation">
          Functional dependency: instructor_id → subject <br/>
          This violates BCNF because instructor_id is not a superkey
        </p>
      </div>

      <h4>BCNF Compliant Tables</h4>

      <div className="compliant-section">
        <h5>Instructors Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Instructor ID</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Certification Level</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor, index) => (
                <tr key={index}>
                  <td>{instructor.instructor_id}</td>
                  <td>{instructor.name}</td>
                  <td>{instructor.specialty}</td>
                  <td>{instructor.certification_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Subjects Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Subject ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.subject_id}</td>
                  <td>{subject.name}</td>
                  <td>{subject.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Instructor Subjects Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔐 Instructor ID</th>
                <th>🔐 Subject ID</th>
              </tr>
            </thead>
            <tbody>
              {instructor_subjects.map((is, index) => (
                <tr key={index}>
                  <td>{is.instructor_id}</td>
                  <td>{is.subject_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Courses Table</h5>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>🔑 Course ID</th>
                <th>🔗 Subject ID</th>
                <th>🔗 Instructor ID</th>
                <th>Time Slot</th>
                <th>Room</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.course_id}</td>
                  <td>{course.subject_id}</td>
                  <td>{course.instructor_id}</td>
                  <td>{course.time_slot}</td>
                  <td>{course.room}</td>
                  <td>{course.start_date}</td>
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