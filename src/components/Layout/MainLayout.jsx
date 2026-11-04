import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

export default function MainLayout(){
  return (
    <div className='layout'>
      <Header />
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  )
}