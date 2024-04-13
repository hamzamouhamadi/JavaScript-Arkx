import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Define AuthRoute as a regular function
const AuthRoute = ({ element, ...rest }) => {
  const loggedIn = useSelector(state => state.users.loggedIn);

  return loggedIn ? <Navigate to="/" /> : <Route {...rest} element={element} />;
};

export default AuthRoute;
