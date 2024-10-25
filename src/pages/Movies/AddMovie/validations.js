// validations.js

export const validateMovie = (title, year) => {
  const errors = {};

  if (!title) {
    errors.title = 'Title is required';
  }

  if (!year) {
    errors.year = 'Year is required';
  } else if (!/^\d{4}$/.test(year)) {
    errors.year = 'Year must be a four-digit number';
  }

  return errors;
};
