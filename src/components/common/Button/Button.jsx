import React from 'react';
import './Button.css';

const Button = ({ children, onClick, widthFull, className, isOutline, ...props }) => {
  const buttonClasses = `common-button ${widthFull ? 'full-width' : ''} ${className || ''} ${isOutline ? 'outline' : ''}  `;

  return (
    <button className={buttonClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
