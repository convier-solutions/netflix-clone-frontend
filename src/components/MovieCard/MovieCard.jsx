import React from 'react';
import './MovieCard.css';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes/routes';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(routes.private[2].path, { state: { movie } });
  };
  return (
    <div className="movie-card" onClick={handleNavigate}>
      <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}${movie?.image_url}`} alt={movie.title} className="movie-image" />
      <div className="movie-info">
        <h3>{movie?.title}</h3>
        <p>{movie?.publishing_year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
