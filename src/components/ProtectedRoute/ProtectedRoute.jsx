import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRouter(){
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  return <Outlet/>
}