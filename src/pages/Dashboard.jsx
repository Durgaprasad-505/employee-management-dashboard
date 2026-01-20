import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import DashboardHeader from '../components/DashboardHeader';
import DashboardStats from '../components/DashboardStats';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import SearchFilter from '../components/SearchFilter';
import './Dashboard.css';

const Dashboard = () => {
  const { employees } = useEmployees();
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'all' || employee.gender === genderFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && employee.isActive) ||
      (statusFilter === 'inactive' && !employee.isActive);

    return matchesSearch && matchesGender && matchesStatus;
  });

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      
      <div className="dashboard-content">
        <div className="dashboard-main">
          <DashboardStats employees={employees} />

          <div className="employee-section">
            <div className="section-header">
              <h2 className="heading-3">Employee Directory</h2>
              <button 
                className="btn-primary"
                onClick={handleAddEmployee}
              >
                Add Employee
              </button>
            </div>

            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              genderFilter={genderFilter}
              setGenderFilter={setGenderFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />

            <EmployeeTable
              employees={filteredEmployees}
              onEdit={handleEditEmployee}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
