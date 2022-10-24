import { Navigate, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../../hooks/useAuth';
export const PrivateRouteInfo = () => {
  const { user } = useContext(AuthContext);
  const userPermission = [];
  user?.permissions.roles.map((perm) =>
    perm.permissions.map((userPerm) => {
      userPermission.push(userPerm);
    })
  );
  if (
    user &&
    userPermission.find((permission) => permission.name === 'conference_show')
  ) {
    return <Outlet />;
  } else {
    return <Navigate to={'/login'} />;
  }
};
