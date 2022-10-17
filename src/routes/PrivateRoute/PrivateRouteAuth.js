import { Navigate, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../../hooks/useAuth';
export const PrivateRouteAuth = () => {
  const { user } = useContext(AuthContext);

  // if (user) {
  //   return <Navigate to={'/'} />;
  // } else {
  //   return <Outlet />;
  // }
};
