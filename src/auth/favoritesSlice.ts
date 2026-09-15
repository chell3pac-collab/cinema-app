import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Favorite {
  id: string;
  title: string;
  poster: string;
}

interface FavoritesState {
  list: Favorite[];
}

const saved = localStorage.getItem('favorites');
const initialList: Favorite[] = saved ? JSON.parse(saved) : [];

const initialState: FavoritesState = {
  list: initialList,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Favorite>) => {
      const newItem = action.payload;
      if (!state.list.some((f) => f.id === newItem.id)) {
        state.list = [...state.list, newItem];
        localStorage.setItem('favorites', JSON.stringify(state.list));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((f) => f.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.list));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
