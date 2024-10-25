import { configureStore } from "@reduxjs/toolkit";
import authReducer from './../slices/authSlice/authSlice';
import moviesReducer from './../slices/moviesSlice/movieSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        movie:moviesReducer
    },
});

export default store;
