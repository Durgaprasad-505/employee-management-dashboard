import React, { useState, useEffect } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { X, Upload, User } from 'lucide-react';
import { US_STATES, fileToBase64, isValidImageFile } from '../utils/helpers';
import './EmployeeForm.css';

const EmployeeForm = ({ employee, onClose }) => {
  const { addEmployee, updateEmployee } = useEmployees();
  const isEditMode = !!employee;

  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
    dateOfBirth: '',
    state: '',
    profileImage: '',
    isActive: true
  });

  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
      setImagePreview(employee.profileImage);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = isValidImageFile(file);
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, profileImage: validation.error }));
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setFormData(prev => ({ ...prev, profileImage: base64 }));
      setImagePreview(base64);
      setErrors(prev => ({ ...prev, profileImage: '' }));
    } catch (error) {
      setErrors(prev => ({ ...prev, profileImage: 'Failed to upload image' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18 || age > 100) {
        newErrors.dateOfBirth = 'Employee must be between 18 and 100 years old';
      }
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (!formData.profileImage) {
      newErrors.profileImage = 'Profile image is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      if (isEditMode) {
        updateEmployee(employee.id, formData);
      } else {
        addEmployee(formData);
      }
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="heading-3">
            {isEditMode ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-grid">
            <div className="form-group span-2">
              <label htmlFor="fullName">
                Full Name <span className="required">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="gender">
                Gender <span className="required">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">
                Date of Birth <span className="required">*</span>
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
            </div>

            <div className="form-group span-2">
              <label htmlFor="state">
                State <span className="required">*</span>
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'error' : ''}
              >
                <option value="">Select a state</option>
                {US_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <span className="error-text">{errors.state}</span>}
            </div>

            <div className="form-group span-2">
              <label>
                Profile Image <span className="required">*</span>
              </label>
              <div className="image-upload-container">
                <div className="image-preview">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <div className="image-placeholder">
                      <User size={48} strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                <div className="upload-actions">
                  <label htmlFor="profileImage" className="btn-upload">
                    <Upload size={20} />
                    Choose Image
                  </label>
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  <p className="upload-hint">
                    JPEG, PNG, GIF or WebP (max 5MB)
                  </p>
                </div>
              </div>
              {errors.profileImage && <span className="error-text">{errors.profileImage}</span>}
            </div>

            <div className="form-group span-2">
              <label className="checkbox-label">
                <input
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <span>Active Employee</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  {isEditMode ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                isEditMode ? 'Update Employee' : 'Add Employee'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
