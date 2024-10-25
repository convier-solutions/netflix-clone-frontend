import React from 'react';
import './Header.css';
import AddIcon from './../../assets/icons/add-icon.svg';
import LogoutIcon from './../../assets/icons/logout-icon.svg';
import { Link } from 'react-router-dom';
import routes from '../../routes/routes';
import { useDispatch } from 'react-redux';
import { clearAuthToken } from '../../redux/slices/authSlice/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearAuthToken());
    window.location.reload();
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <h1 className="header-title">My Movies</h1>
        <Link to={routes.private[1].path}>
          <img src={AddIcon} alt="" />
        </Link>
      </div>
      <div className="header-right" onClick={() => handleLogout()}>
        <span className="logout-text">Logout</span>
        <img src={LogoutIcon} alt="" />
      </div>
    </header>
  );
};

export default Header;
