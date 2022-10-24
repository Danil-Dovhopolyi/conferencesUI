import { Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../../hooks/useAuth';
import Error403 from '../Error403';
export const PrivateRouteCreate = () => {
  const { user } = useContext(AuthContext);
  const userPermission = [];
  user?.permissions.roles.map((perm) =>
    perm.permissions.map((userPerm) => {
      userPermission.push(userPerm);
    })
  );
  if (
    user &&
    userPermission.find((permission) => permission.name === 'conference_create')
  ) {
    return <Outlet />;
  } else {
    return <Error403 />;
  }
};
