import React, { useState, useEffect } from 'react';
import './Login.css';
import InputField from '../../../components/common/TextField/TextField';
import Button from '../../../components/common/Button/Button';
import { handleEmailChange, handlePasswordChange, validateLogin } from './validations';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import routes from '../../../routes/routes';
import { logInService, resetAuthState } from '../../../redux/slices/authSlice/authSlice';

const Login = () => {
  const { data, loading } = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(email, password);

    console.log('submit');

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      dispatch(logInService({ email, password }));
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (data?.status === 'Success') {
      console.log('data', routes.private[0].path);
      navigate(routes.private[0].path);
      dispatch(resetAuthState());
    } else if (data?.status === 'Error') {
      setErrors({ general: data.message });
      dispatch(resetAuthState());
    }
  }, [data, dispatch, navigate]);

  return (
    <div className="login-form-main-container">
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-heading-container">
            <h1>Sign in</h1>
          </div>

          <InputField
            type="text"
            value={email}
            onChange={handleEmailChange(setEmail, setErrors, password, validateLogin, errors)}
            error={errors.email}
            placeholder="Email"
          />
          <div>
            <InputField
              type="Password"
              value={password}
              onChange={handlePasswordChange(setPassword, setErrors, email, validateLogin, errors)}
              error={errors.password}
              placeholder="Enter password"
            />

            {errors.general && <div className="error-message">{errors.general}</div>}
          </div>
          <div className="login-form-remember-me">
            <label>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Remember me
            </label>
          </div>
          <Button className={'full-width'} type="submit" disabled={loading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
