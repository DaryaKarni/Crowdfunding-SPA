import { NavLink } from 'react-router-dom';
import './Header.module.css';

export default function Header(){
  //temporary user data
  const user = {
    name: 'Darya',
    avatar: 'https://dummyjson.com/icon/datya/1',
  }
  const handleLogout = () => {
    //token cleanup - later 
  }
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
          className = {({isActive}) => {
            isActive ? 'header__link header__link--active' : 'header__link';
          }}
        > Shop
        </NavLink>
      </nav>
      <div className="header__user">
          <img src={user.avatar} alt={user.name} className='header__avatar'/>
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
      </div>
    </div>
  </header>)
}