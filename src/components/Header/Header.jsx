import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import './Header.css';
import { useRef, useState, useEffect } from 'react';

export default function Header(){
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownRef.current && dropdownRef.current.contains(event.target)){
        setIsDropdownOpen(false);
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, []);

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
        <div className="header__user-row">
          {user.image && (
            <img src={user.image} alt={user.firstName} className="header__avatar" />
          )}

          <div
            className="header__arrow-wrapper"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              type="button"
              className="header__arrow-btn"
              aria-label="Toggle user menu"
            >
              <svg 
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="header__dropdown">
                <div className="header__dropdown-info">
                  <p className="header__dropdown-name">
                    {user.firstName} {user.lastName}
                  </p>
                </div>

                <div className="header__dropdown-divider" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="header__dropdown-logout-btn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NavLink to="/login" className="header__link">
          Sign In
        </NavLink>
      )}
    </div>
    </div>
  </header>)  
}