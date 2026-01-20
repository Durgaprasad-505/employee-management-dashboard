import React, { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { Edit, Trash2, Printer, AlertCircle } from 'lucide-react';
import { formatDate, calculateAge } from '../utils/helpers';
import DeleteConfirmModal from './DeleteConfirmModal';
import './EmployeeTable.css';

const EmployeeTable = ({ employees, onEdit }) => {
  const { toggleEmployeeStatus, deleteEmployee } = useEmployees();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleToggleStatus = (id) => {
    toggleEmployeeStatus(id);
  };

  const handleDeleteClick = (employee) => {
    setDeleteConfirm(employee);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteEmployee(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <AlertCircle size={48} strokeWidth={1.5} />
        <h3>No employees found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-actions no-print">
        <button 
          className="btn-secondary"
          onClick={handlePrint}
        >
          <Printer size={18} />
          Print List
        </button>
      </div>

      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>State</th>
              <th>Status</th>
              <th className="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="animate-fade-in">
                <td className="td-id">#{employee.id}</td>
                <td>
                  <div className="employee-photo">
                    <img 
                      src={employee.profileImage} 
                      alt={employee.fullName}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.fullName)}&background=random`;
                      }}
                    />
                  </div>
                </td>
                <td className="td-name">{employee.fullName}</td>
                <td>{employee.gender}</td>
                <td>{formatDate(employee.dateOfBirth)}</td>
                <td>{calculateAge(employee.dateOfBirth)} years</td>
                <td>{employee.state}</td>
                <td>
                  <button
                    className={`status-toggle ${employee.isActive ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleStatus(employee.id)}
                  >
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="td-actions no-print">
                  <div className="action-buttons">
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => onEdit(employee)}
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDeleteClick(employee)}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteConfirm && (
        <DeleteConfirmModal
          employee={deleteConfirm}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </>
  );
};

export default EmployeeTable;
