import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({});

  useEffect(() => {
    // Load employee data from CSV file on component mount
    fetch('/employees.csv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          complete: result => setEmployees(result.data),
        });
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prevEmployee => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleAddEmployee = () => {
    setEmployees(prevEmployees => [
      ...prevEmployees,
      { ...newEmployee, id: prevEmployees.length + 1 },
    ]);
    setNewEmployee({});
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
  };

  return (
    <div>
      <h1>Employee CRUD App</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.designation}</td>
              <td>{employee.salary}</td>
              <td>
                <button onClick={() => handleDeleteEmployee(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Employee</h2>
      <div>
        <label>Name: </label>
        <input type="text" name="name" value={newEmployee.name || ''} onChange={handleInputChange} />
      </div>
      <div>
        <label>Designation: </label>
        <input type="text" name="designation" value={newEmployee.designation || ''} onChange={handleInputChange} />
      </div>
      <div>
        <label>Salary: </label>
        <input type="text" name="salary" value={newEmployee.salary || ''} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddEmployee}>Add Employee</button>
    </div>
  );
};

export default App;
