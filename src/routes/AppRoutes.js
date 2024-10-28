import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './routes';
import { selectAuth } from '../redux/slices/authSlice/authSlice';

const AppRoutes = () => {
  const { isAuthenticated } = useSelector(selectAuth);
  
  return (
    <Router>
      <Routes>
        {routes.public.map((route, index) => {
          if (route.path === '/login' && isAuthenticated) {
            return <Route key={index} path={route.path} element={<Navigate to="/dashboard" />} />;
          }
          return <Route key={index} path={route.path} element={<route.component />} />;
        })}

        {isAuthenticated ? (
          routes.private.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        <Route path="*" element={<Navigate to='/movies' />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
