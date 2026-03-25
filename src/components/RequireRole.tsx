import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import ForbiddenPage from '../pages/public/ForbiddenPage';

interface RequireRoleProps {
  allowedRoles: ('Client' | 'Photographer' | 'Admin')[];
}

const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles }) => {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <ForbiddenPage />;
  }

  return <Outlet />;
};

export default RequireRole;