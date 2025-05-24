import React, { useEffect, useState } from 'react';
import EmployeeTable from './components/EmployeeTable';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        if (!response.ok) {
          throw new Error('API fetch failed');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        alert('Failed to fetch data');
      }
    };

    fetchEmployees();
  }, []);

  const lastIndex = currentPage * employeesPerPage;
  const firstIndex = lastIndex - employeesPerPage;
  const currentEmployees = employees.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employee Data</h2>
      <EmployeeTable employees={currentEmployees} />
      
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button 
          onClick={handlePrevious} 
          disabled={currentPage === 1}
          data-testid="previous-button"
        >
          Previous
        </button>

        <p>{currentPage}</p>

        <button 
          onClick={handleNext} 
          disabled={currentPage === totalPages}
          data-testid="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;