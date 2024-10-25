import React from 'react';
import './EmptyList.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import routes from '../../../routes/routes';

const EmptyList = () => {
  const navigate = useNavigate();
  return (
    <div className="empty-list-container">
      <h2>Your movie list is empty</h2>
      <Button onClick={() => navigate(routes.private[1].path)}>Add a new movie</Button>
    </div>
  );
};

export default EmptyList;
