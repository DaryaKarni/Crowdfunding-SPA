import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRouter(){
  const isAuthenticated = true; //placeholder before token appears
  if (!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  return <Outlet/>
}