import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import Header from '../../../components/Header/Header';
import MovieCard from '../../../components/MovieCard/MovieCard';
import Pagination from '../../../components/Pagination/Pagination';
import { fetchMovies, selectMovies } from '../../../redux/slices/moviesSlice/movieSlice';
import EmptyList from '../../../components/common/EmptyList/EmptyList';
// import { fetchMovies, selectMovies, resetMoviesState } from '../../../redux/slices/moviesSlice';

const MovieList = () => {
  const dispatch = useDispatch();
  const { listMovies, loading, error } = useSelector((state) => state.movie.listMovies);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch movies when the component mounts
    // dispatch(fetchMovies());

    // Reset movies state on component unmount
    return () => {
      // dispatch(resetMoviesState());
    };
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = listMovies?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="movie-list-container">
      {listMovies?.length > 0 ? (
        <>
          <Header />
          <div className="movies-grid">
            {paginatedData?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {listMovies?.length > 0 && <Pagination totalItems={listMovies?.length ?? 0} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />}
        </>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default MovieList;
