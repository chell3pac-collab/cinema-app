import React from 'react';
import { useAppDispatch } from '../hooks/index';
import { addToFavorites, removeFromFavorites } from '../auth/favoritesSlice';
import type { Favorite } from '../auth/favoritesSlice';
import FavoritesIcon from '../assets/FavoritesIcon.svg?react'; 
import './HeroSection.css'

interface FavoriteIconButtonProps {
  movieId: string | number;
  movieTitle: string;
  moviePoster: string;
  isFavorite: boolean;
}

export const FavoriteIconButton = ({ 
  movieId, 
  movieTitle, 
  moviePoster, 
  isFavorite 
}: FavoriteIconButtonProps) => {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(String(movieId)));
    } else {
      const favoriteItem: Favorite = {
        id: String(movieId),
        title: movieTitle,
        poster: moviePoster,
      };
      dispatch(addToFavorites(favoriteItem));
    }
  };

  return (
    <button
      className="btn-icon"
      onClick={handleToggle}
      disabled={isFavorite}
      aria-label={isFavorite 
        ? `Убрать из избранного ${movieTitle}` 
        : `Добавить в избранное ${movieTitle}`}
      title={isFavorite ? 'Уже в избранном' : 'Добавить в избранное'}
    >
      <FavoritesIcon 
        className={isFavorite ? 'icon-heart--active' : 'icon-heart'} 
      />
    </button>
  );
};
