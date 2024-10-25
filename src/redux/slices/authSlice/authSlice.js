import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LOGIN } from '../../services/services';
import API from '../../services/API';

export const logInService = createAsyncThunk('auth/logIn', async (data) => {
  const response = await API.post(LOGIN, data);
  return response.data;
});


const initialState = {
  user: {
    data: null,
    loading: false,
    error:null
  },
  isAuthenticated: !!localStorage.getItem('authToken'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user.data = null;
      state.user.error = null;
    },
    setAuthToken: (state, action) => {
      localStorage.setItem('authToken', action.payload);
      state.isAuthenticated = true;
    },
    clearAuthToken: (state) => {
      state.token = null;
      localStorage.removeItem('authToken');
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInService.pending, (state) => {
        state.user.loading = true;
        state.user.error = null;
      })
      .addCase(logInService.fulfilled, (state, action) => {
        state.user.loading = false;
        console.log("ABC",action.payload )
        state.user.data = action.payload; 
        if (action.payload.status === "Success") {
          state.isAuthenticated = true;
          localStorage.setItem('authToken', state.token);
        } else {
          state.error = action.payload.message || "Login failed";
        }
      })
      .addCase(logInService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login request failed";
        console.log("Login request failed",action.payload )

      });
  },
});


export const { resetAuthState, setAuthToken, clearAuthToken } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
