import { Navigate, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../../hooks/useAuth';
export const PrivateRouteAuth = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  user === null ? <Outlet /> : <Navigate to={'/'} />;
};
