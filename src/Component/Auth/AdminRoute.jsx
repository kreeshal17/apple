import { Navigate } from 'react-router-dom';
import { useUserRole } from './useUserRole';

const AdminRoute = ({ children, fallback = null }) => {
  const role = useUserRole();
 
  if (role === null) return <div>Loading...</div>; // Or your loading component
  return role === 'Admin' ? children : <Navigate to="/" replace />;
};

export default AdminRoute;