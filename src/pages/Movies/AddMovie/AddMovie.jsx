import React, { useEffect, useState } from 'react';
import './AddMovie.css';
import { validateMovie } from './validations';
import FileUpload from '../../../components/common/FileUpload/FileUpload';
import InputField from '../../../components/common/TextField/TextField';
import Button from '../../../components/common/Button/Button';
import { addMovie, resetMoviesState } from '../../../redux/slices/moviesSlice/movieSlice';
import routes from '../../../routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const { data, loading } = useSelector((state) => state?.movie?.addMovie);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      const payload = {
        picture: image,
        title: title,
        publishing_year: year,
      };
      dispatch(addMovie(payload));
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (data?.status === 'Success') {
      navigate(routes.private[0].path);
      dispatch(resetMoviesState());
    } else if (data?.status === 'Error') {
      setErrors({ general: data.message });
      dispatch(resetMoviesState());
    }
  }, [data, dispatch, navigate]);

  return (
    <div className="add-movies-container">
      <h2>Create a new movie</h2>
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

export default AddMovie;
