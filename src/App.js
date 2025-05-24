import React, { useEffect, useState } from 'react';
import EmployeeTable from './components/EmployeeTable';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const employeesPerPage = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        if (!response.ok) {
          throw new Error('API fetch failed');
        }
        const data = await response.json();
        setEmployees(data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch data');
      }
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  // Ensure currentPage is never out of range after employees change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [employees, currentPage, totalPages]);

  const lastIndex = currentPage * employeesPerPage;
  const firstIndex = lastIndex - employeesPerPage;
  const currentEmployees = employees.slice(firstIndex, lastIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => {
        console.log('Next page:', prev + 1);
        return prev + 1;
      });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => {
        console.log('Previous page:', prev - 1);
        return prev - 1;
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employee Data</h2>

      {loading && <p>Loading employees...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          <EmployeeTable employees={currentEmployees} />

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              data-testid="previous-button"
              aria-label="Previous Page"
            >
              Previous
            </button>

            <p>{currentPage}</p>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              data-testid="next-button"
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
