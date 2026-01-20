import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within EmployeeProvider');
  }
  return context;
};

// Initial mock data
const initialEmployees = [
  {
    id: 1,
    fullName: 'Sarah Johnson',
    gender: 'Female',
    dateOfBirth: '1990-05-15',
    state: 'California',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    isActive: true
  },
  {
    id: 2,
    fullName: 'Michael Chen',
    gender: 'Male',
    dateOfBirth: '1988-08-22',
    state: 'New York',
    profileImage: 'https://i.pravatar.cc/150?img=13',
    isActive: true
  },
  {
    id: 3,
    fullName: 'Emily Rodriguez',
    gender: 'Female',
    dateOfBirth: '1992-03-10',
    state: 'Texas',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    isActive: false
  },
  {
    id: 4,
    fullName: 'David Kim',
    gender: 'Male',
    dateOfBirth: '1985-11-30',
    state: 'Florida',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    isActive: true
  },
  {
    id: 5,
    fullName: 'Jessica Williams',
    gender: 'Female',
    dateOfBirth: '1991-07-18',
    state: 'Illinois',
    profileImage: 'https://i.pravatar.cc/150?img=9',
    isActive: true
  },
  {
    id: 6,
    fullName: 'James Anderson',
    gender: 'Male',
    dateOfBirth: '1987-12-05',
    state: 'Washington',
    profileImage: 'https://i.pravatar.cc/150?img=15',
    isActive: false
  },
  {
    id: 7,
    fullName: 'Amanda Martinez',
    gender: 'Female',
    dateOfBirth: '1993-09-25',
    state: 'Massachusetts',
    profileImage: 'https://i.pravatar.cc/150?img=20',
    isActive: true
  },
  {
    id: 8,
    fullName: 'Robert Taylor',
    gender: 'Male',
    dateOfBirth: '1989-04-14',
    state: 'Arizona',
    profileImage: 'https://i.pravatar.cc/150?img=33',
    isActive: true
  }
];

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage or use initial data
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      setEmployees(initialEmployees);
      localStorage.setItem('employees', JSON.stringify(initialEmployees));
    }
    setLoading(false);
  }, []);

  const saveToStorage = (updatedEmployees) => {
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now()
    };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    saveToStorage(updatedEmployees);
    return newEmployee;
  };

  const updateEmployee = (id, updatedData) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? { ...emp, ...updatedData } : emp
    );
    setEmployees(updatedEmployees);
    saveToStorage(updatedEmployees);
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    saveToStorage(updatedEmployees);
  };

  const toggleEmployeeStatus = (id) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
    );
    setEmployees(updatedEmployees);
    saveToStorage(updatedEmployees);
  };

  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === id);
  };

  const value = {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    toggleEmployeeStatus,
    getEmployeeById
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
