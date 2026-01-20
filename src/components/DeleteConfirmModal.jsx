import React from 'react';
import { AlertTriangle } from 'lucide-react';
import './DeleteConfirmModal.css';

const DeleteConfirmModal = ({ employee, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirm-modal animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">
          <AlertTriangle size={48} />
        </div>
        
        <h3 className="confirm-title">Delete Employee?</h3>
        
        <p className="confirm-message">
          Are you sure you want to delete <strong>{employee.fullName}</strong>? 
          This action cannot be undone.
        </p>

        <div className="confirm-actions">
          <button 
            className="btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="btn-danger"
            onClick={onConfirm}
          >
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
