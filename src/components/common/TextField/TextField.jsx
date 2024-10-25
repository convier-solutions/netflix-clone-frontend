import React from 'react';
import './TextField.css';

const InputField = ({ type = 'text', value, onChange, error, placeholder, maxWidth }) => {
  return (
    <div className="input-container">
      <div>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{ maxWidth }} className={`input-field ${error ? 'error' : ''}`} />
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
};

export default InputField;
