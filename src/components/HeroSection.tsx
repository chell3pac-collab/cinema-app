import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchRandomHeroMovie } from '../movies/moviesSlice';
import { TrailerModal } from '../modals/TrailerModal';
import UpdateIcon from '../assets/UpdateIcon.svg?react';
import FavoritesIcon from '../assets/FavoritesIcon.svg?react';
import StarIcon from '../assets/StarIcon.svg?react';
import { addToFavorites, removeFromFavorites } from '../auth/favoritesSlice';
import { getRatingClass } from '../utils/ratingClass';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  onRequestAddAfterAuth: (movieId: number) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRequestAddAfterAuth }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { heroMovie, loading } = useAppSelector((state) => state.movies);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const favorites = useAppSelector((state) => state.favorites.list);
  const movieId = heroMovie?.id ?? 0;
  const idStr = String(movieId);
  const trailerId = heroMovie?.trailerUrl ?? '';
  const isFavorite = isAuthenticated && favorites.some((fav) => fav.id === idStr);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);


  if (loading && !heroMovie) return <div className="hero-loading">Загрузка...</div>;
  if (!heroMovie) return null;

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      onRequestAddAfterAuth(movieId);
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(idStr));
    } else {
      const favoriteItem = {
        id: idStr,
        title: heroMovie.title,
        poster: heroMovie.poster,
      };
      dispatch(addToFavorites(favoriteItem));
    }
  };

  const handleGoToMoviePage = () => {
    navigate(`/movie/${movieId}`);
  };

  return (

    <section className="hero-section">
      <div className="hero-section-wrapper">
        <div className="hero-info">
          <div className="hero-info-wrapper">
            <p className={`hero-rating ${getRatingClass(heroMovie.rating)}`}><StarIcon /> {heroMovie.rating}</p>
            <p className="hero-year">{heroMovie.year}</p>
            <p className="hero-genre">{heroMovie.genre}</p>
            <p className="hero-duration">{heroMovie.duration}</p>
          </div>
          <h1 className="hero-info-title">{heroMovie.title}</h1>
          <p className="hero-overview">{heroMovie.overview || 'Описание недоступно'}</p>
          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => setIsTrailerOpen(true)}
              disabled={loading}
            >
              Трейлер
            </button>
            <div className='btn-wrapper'>
            <button className="btn"
              onClick={handleGoToMoviePage}
              disabled={loading}
              aria-label={`Подробнее о фильме ${heroMovie.title}`}>
              О фильме
            </button>
            <button
            className={`btn-icon ${isFavorite ? 'btn-icon--active' : ''}`} 
              
              onClick={handleFavoriteClick}
              disabled={loading}
              aria-label={isFavorite
                ? `Убрать из избранного ${heroMovie.title}`
                : `Добавить в избранное ${heroMovie.title}`}
            >
              <FavoritesIcon
                className={isFavorite ? 'icon-heart--active' : 'icon-heart'}
              />
            </button>
            <button
              className="btn-icon"
              onClick={() => dispatch(fetchRandomHeroMovie())}
              disabled={loading}
              aria-label="Обновить фильм"
            >
              <UpdateIcon
                style={{
                  transition: 'transform 0.3s ease',
                  transform: loading ? 'rotate(360deg)' : 'rotate(0deg)',
                }} />
            </button>
            </div>
          </div>
        </div>
        <div className='hero-info-poster'>
          <img className='hero-info-img' 
          src={heroMovie.poster} 
          alt={heroMovie.title} 
          loading="eager" />
        </div>
      </div>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        videoId={trailerId}
      />
    </section>
  );
};

export default HeroSection;





