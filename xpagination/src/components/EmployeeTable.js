import React from 'react';

const EmployeeTable = ({ employees }) => {
  return (
    <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {employees.length > 0 ? (
          employees.map((emp, index) => (
            <tr key={emp.id} data-testid={`employee-row-${index}`}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" align="center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default EmployeeTable;