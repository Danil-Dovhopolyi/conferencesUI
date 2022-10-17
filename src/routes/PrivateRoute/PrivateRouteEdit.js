import { Navigate, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../../hooks/useAuth';
export const PrivateRouteEdit = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={'/login'} />;
  }
};
