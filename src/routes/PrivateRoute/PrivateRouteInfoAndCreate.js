import { Navigate, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../../hooks/useAuth';
import Error403 from '../Error403';
export const PrivateRouteInfoAndCreate = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Outlet />;
  } else {
    return <Error403 />;
  }
};
