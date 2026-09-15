import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type Movie, mockMovies } from '../data/movies.mock';

const FAVORITES_KEY = 'app_favorites_ids';

const loadFavorites = (): number[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

interface MoviesState {
  heroMovie: Movie | null;
  topMovies: Movie[];
  favoriteIds: number[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  heroMovie: mockMovies.length > 0 ? mockMovies[0] : null,
  topMovies: mockMovies.slice(1, 11),
  favoriteIds: loadFavorites(),
  loading: false,
  error: null,
};

export const fetchRandomHeroMovie = createAsyncThunk(
  'movies/fetchRandomHeroMovie',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const randomIndex = Math.floor(Math.random() * mockMovies.length);
    return mockMovies[randomIndex];
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleFavorite: (state, action: { payload: number }) => {
      const id = action.payload;

      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter((favId) => favId !== id);
      } else {
        state.favoriteIds = [...state.favoriteIds, id];
      }

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favoriteIds));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomHeroMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomHeroMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.heroMovie = action.payload;
      })
      .addCase(fetchRandomHeroMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки фильма';
      });
  },
});

export const { toggleFavorite } = moviesSlice.actions;
export default moviesSlice.reducer;

