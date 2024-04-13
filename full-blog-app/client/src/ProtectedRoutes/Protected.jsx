import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, ...rest }) => {
  const loggedIn = useSelector(state => state.users.loggedIn);

  return loggedIn ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
