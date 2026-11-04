import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import './Header.css';

export default function Header(){
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
  <header className="header">
    <div className="header__container">
      <nav className="header__nav">
        <NavLink
          to="/"
          end
          className = {({isActive}) => 
            isActive ? 'header__link header__link--active' : 'header__link'
          }
        > Home
        </NavLink>

        <NavLink
          to="/locations"
          end
          className = {({isActive}) => 
            isActive ? 'header__link header__link--active' : 'header__link'
          }
        > Locations
        </NavLink>

        <NavLink
          to="/shop"
          end
          className = {({isActive}) => 
            isActive ? 'header__link header__link--active' : 'header__link'
          }
        > Shop
        </NavLink>

      </nav>
      <div className="header__user">
        {user ? (
            <>
          {user.image && (
          <img src={user.avatar} alt={user.name} className='header__avatar'/>
           )}
          <button
            onCLick={handleLogout}
            className='header__logout-btn'
            aria-label='Logout'
            title='Log out'
          > 
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
           </>
          ) : (
             <NavLink to="/login" className="header__link">
              Login
            </NavLink>
          )}
      </div>
    </div>
  </header>)
}