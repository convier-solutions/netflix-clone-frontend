import React, { useEffect, useState } from 'react';
import SuccessIcon from './../../../assets/icons/success-icon.svg';
import InfoIcon from './../../../assets/icons/info-icon.svg';
import ErrorIcon from './../../../assets/icons/alert-triangle.svg';
import CloseIcon from './../../../assets/icons/close-Icon.svg';
import './Toast.css';

const NotificationToast = ({ message, variant, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`notification-toast ${variant}`}>
      <div className="toast-content">
        {variant === 'success' && <img src={SuccessIcon} alt="Success" className="toast-icon" />}
        {variant === 'info' && <img src={InfoIcon} alt="Info" className="toast-icon" />}
        {variant === 'error' && <img src={ErrorIcon} alt="Error" className="toast-icon" />}
        <span className="toast-message">{message}</span>
      </div>
      <img className="toast-close-icon" src={CloseIcon} alt="Close" onClick={handleClose} />
    </div>
  );
};

export default NotificationToast;
