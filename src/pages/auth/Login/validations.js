
export const validateLogin = (email, password) => {
  const errors = {};

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'Email is required*';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Invalid email format*';
  }

  // Password validation
  if (!password) {
    errors.password = 'Password is required*';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters*';
  }

  return errors;
};


// formHandlers.js
export const handleEmailChange = (setEmail, setErrors, password, validateLogin, errors) => (e) => {
  const value = e.target.value;
  setEmail(value);
  if (Object.keys(errors).length > 0) {
    const validationErrors = validateLogin(value, password);
    setErrors((prevErrors) => ({ ...prevErrors, email: validationErrors.email }));
  }
};

export const handlePasswordChange = (setPassword, setErrors, email, validateLogin, errors) => (e) => {
  const value = e.target.value;
  setPassword(value);
  if (Object.keys(errors).length > 0) {
    const validationErrors = validateLogin(email, value);
    setErrors((prevErrors) => ({ ...prevErrors, password: validationErrors.password }));
  }
};
