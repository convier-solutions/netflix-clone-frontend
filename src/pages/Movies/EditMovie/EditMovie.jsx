import React, { useEffect, useState } from 'react';
import './../AddMovie/AddMovie.css';
import { validateMovie } from '../AddMovie/validations';
import FileUpload from '../../../components/common/FileUpload/FileUpload';
import InputField from '../../../components/common/TextField/TextField';
import Button from '../../../components/common/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../../routes/routes';
import { resetMoviesState, editMovie } from '../../../redux/slices/moviesSlice/movieSlice'; // Ensure editMovie is imported

const EditMovie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state?.movie?.editMovie);

  const location = useLocation()?.state;
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
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('publishing_year', year);

      dispatch(editMovie({ id: location.movie.id, movieData: formData }));
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (!location.movie.id) {
      navigate(-1);
    } else {
      setTitle(location.movie.title);
      setYear(location.movie.publishing_year);
      setImagePreview(`${process.env.REACT_APP_IMAGE_BASE_URL}${location.movie?.image_url}`);
    }
  }, [location, navigate]);

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
      <h2>Edit Movie</h2>
      <div className="movie-form-container">
        <div className="drag-drop-area">
          <FileUpload onDrop={handleFileDrop} isDragDropText={true} width="476px" height="504px" imagePreview={imagePreview} />
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
            <Button isOutline className={'full-width'} onClick={() => navigate(routes.private[0].path)}>
              Cancel
            </Button>
            <Button className={'full-width'} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : 'Update'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
