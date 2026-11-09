import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HomePage from "./pages/Home/HomePage";
import LocationsPage from "./pages/Locations/LocationsPage";
import LoginPage from "./pages/Login/LoginPage";
import {Routes, Route, Navigate} from 'react-router-dom';
import ShopPage from "./pages/Shop/ShopPage";
import MainLayout from "./components/Layout/MainLayout"

export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout/>}>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/locations' element={<LocationsPage/>}></Route>
          <Route path='/shop' element={<ShopPage/>}></Route>
        </Route>
      </Route>

      <Route path='*' element={<Navigate to='/' replace/>}/>
    </Routes>
  );
}