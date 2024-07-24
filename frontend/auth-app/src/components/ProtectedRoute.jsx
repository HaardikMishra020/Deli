import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('authToken');

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
