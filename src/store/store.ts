import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import moviesReducer from '../movies/moviesSlice';
import favoritesReducer from '../auth/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    favorites: favoritesReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


