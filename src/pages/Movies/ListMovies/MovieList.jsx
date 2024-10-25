import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import Header from '../../../components/Header/Header';
import MovieCard from '../../../components/MovieCard/MovieCard';
import Pagination from '../../../components/Pagination/Pagination';
import { fetchMovies } from '../../../redux/slices/moviesSlice/movieSlice';
import EmptyList from '../../../components/common/EmptyList/EmptyList';

const MovieList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state?.movie?.listMovies);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalItems = data?.data?.length || 0;
  const paginatedData = totalItems > 0 ? data?.data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="movie-list-container">
      {totalItems > 0 ? (
        <>
          <Header />
          <div className="movies-grid">
            {paginatedData.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
        </>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default MovieList;
