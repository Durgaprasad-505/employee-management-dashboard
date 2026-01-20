import React from 'react';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';
import './DashboardStats.css';

const DashboardStats = ({ employees }) => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.isActive).length;
  const inactiveEmployees = employees.filter(emp => !emp.isActive).length;
  const activePercentage = totalEmployees > 0 
    ? Math.round((activeEmployees / totalEmployees) * 100) 
    : 0;

  const stats = [
    {
      id: 1,
      label: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'primary',
      trend: null
    },
    {
      id: 2,
      label: 'Active Employees',
      value: activeEmployees,
      icon: UserCheck,
      color: 'success',
      trend: `${activePercentage}%`
    },
    {
      id: 3,
      label: 'Inactive Employees',
      value: inactiveEmployees,
      icon: UserX,
      color: 'error',
      trend: `${100 - activePercentage}%`
    },
    {
      id: 4,
      label: 'Activity Rate',
      value: `${activePercentage}%`,
      icon: TrendingUp,
      color: 'accent',
      trend: 'of total'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div 
          key={stat.id} 
          className={`stat-card stat-${stat.color} animate-fade-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="stat-icon">
            <stat.icon size={24} strokeWidth={1.5} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            {stat.trend && (
              <div className="stat-trend">{stat.trend}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
