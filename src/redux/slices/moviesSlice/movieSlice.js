import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/API'; 
import { ADD_MOVIE, EDIT_MOVIE, LIST_MOVIE } from '../../services/services';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await API.get(LIST_MOVIE); 
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movieData) => {
  const response = await API.post(ADD_MOVIE, movieData); 
  return response.data;
});

export const editMovie = createAsyncThunk('movies/editMovie', async ({ id, movieData }) => {
  const response = await API.put(`${EDIT_MOVIE}${id}`, movieData); 
  return response.data;
});

const initialState = {
  listMovies: {
    data: null,
    loading: false,
    error: null,
  },
  addMovie: {
    data: null,
    loading: false,
    error: null,
  },
  editMovie: {
    data: null,
    loading: false,
    error: null,
  },
};

// Slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetMoviesState: (state) => {
      state.listMovies.data = null;
      state.listMovies.error = null;
      state.addMovie.data = null;
      state.addMovie.error = null;
      state.editMovie.data = null;
      state.editMovie.error = null;
    },
  },
  extraReducers: (builder) => {
    // List Movies
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.listMovies.loading = true;
        state.listMovies.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.listMovies.loading = false;
        state.listMovies.data = action.payload; 
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.listMovies.loading = false;
        state.listMovies.error = action.error.message || "Failed to fetch movies";
      })
   
      .addCase(addMovie.pending, (state) => {
        state.addMovie.loading = true;
        state.addMovie.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.addMovie.loading = false;
        state.addMovie.data = action.payload; 
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.addMovie.loading = false;
        state.addMovie.error = action.error.message || "Failed to add movie";
      })
   
      .addCase(editMovie.pending, (state) => {
        state.editMovie.loading = true;
        state.editMovie.error = null;
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        state.editMovie.loading = false;
        state.editMovie.data = action.payload; 
       
      })
      .addCase(editMovie.rejected, (state, action) => {
        state.editMovie.loading = false;
        state.editMovie.error = action.error.message || "Failed to edit movie";
      });
  },
});


export const { resetMoviesState } = moviesSlice.actions;
export default moviesSlice.reducer;
