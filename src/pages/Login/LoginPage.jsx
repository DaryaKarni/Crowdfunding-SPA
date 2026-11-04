import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from '../../api/dummyJsonApi';
import { setCredentials } from "../../features/auth/authSlice";
import './LoginPage.css';

export default function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated= useSelector((state) => state.auth.isAuthenticated);
  const [login, {isLoading, error: apiError}] = useLoginMutation();

  useEffect(() => {
    if(isAuthenticated){
      navigate('/', {replace: true});
    }
  }, [isAuthenticated, navigate])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if(!username.trim() || !password.trim()){
      setValidationError('Please enter both username and password');
      return;
    }

    try {
      const userData = await login({
        username: username.trim(),
        password: password.trim(),
      }).unwrap();

      const token = userData.accessToken;

      dispatch(
        setCredentials({
          user: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          image: userData.image,
          },
          token,
        })
      );

       navigate('/', { replace: true });
    } catch(err) {
      console.error('Login failed:', err);
    }
  } 

  const handleFillDemo = () => {
    setUsername('emilys');
    setPassword('emilyspass');
    setValidationError('');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <span className="login-card__logo">Crowdfarm</span>
          <h1 className="login-card__title">Sign In</h1>
          <p className="login-card__subtitle">
            Access investment plots and agricultural projects
          </p>
        </div>
        {validationError && (
          <div className="login-card__error-box">{validationError}</div>
        )}
        {apiError && (
          <div className="login-card__error-box">
            {apiError?.data?.message || 'Invalid username or password.'}
          </div>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form__group">
            <label htmlFor="username" className="login-form__label">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="e.g. emilys"
              className="login-form__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
          <div className="login-form__group">
            <label htmlFor="password" className="login-form__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="login-form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="login-form__submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="login-form__spinner" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
             <div className="login-card__demo-hint">
          <p>
            Demo credentials: <strong>emilys</strong> / <strong>emilyspass</strong>
          </p>
          <button
            type="button"
            className="login-card__fill-btn"
            onClick={handleFillDemo}
            disabled={isLoading}
          >
            Auto-fill credentials
          </button>
        </div>
      </div>
    </div>
  );
}