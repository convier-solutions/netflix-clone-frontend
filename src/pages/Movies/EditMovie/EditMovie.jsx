import React, { useState } from 'react';
import './../AddMovie/AddMovie.css';
import { validateMovie } from '../AddMovie/validations';
import FileUpload from '../../../components/common/FileUpload/FileUpload';
import InputField from '../../../components/common/TextField/TextField';
import Button from '../../../components/common/Button/Button';

const EditMovie = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateMovie(title, year);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Movie Title:', title);
      console.log('Publishing Year:', year);
      console.log('Image:', image);
      // Proceed with form submission (e.g., send data to an API)
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="add-movies-container">
      <h2>Edit</h2>
      <div className="movie-form-container">
        <div className="drag-drop-area">
          {imagePreview ? (
            <img src={imagePreview} className="uploaded-image" alt="no uploaded image" />
          ) : (
            <FileUpload onDrop={handleFileDrop} isDragDropText={true} width="476px" height="504px" />
          )}
        </div>

        <div className="form-area">
          <InputField type="text" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} placeholder="Title" />
          <InputField
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            error={errors.year}
            placeholder="Publishing Year (YYYY)"
            maxWidth={'60%'}
          />

          <div className="form-buttons">
            <Button isOutline className={'full-width'}>
              Cancel
            </Button>
            <Button className={'full-width'} onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
