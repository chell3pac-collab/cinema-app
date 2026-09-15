import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/index';
import { mockMovies } from '../data/movies.mock';
import { FavoriteIconButton } from '../components/FavoriteIconButton';
import { TrailerModal } from '../modals/TrailerModal';
import StarIcon from '../assets/StarIcon.svg?react';
import { getRatingClass } from '../utils/ratingClass';
import './MoviePage.css';

interface InfoRowProps {
  label: string;
  value: string | number | null | undefined;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  if (value === null || value === undefined) {
    return (
      <div className="info-row">
        <span className="label">{label}</span>
        <span className="value">Не указан</span>
      </div>
    );
  }

  let displayValue = String(value);

  if (label === 'Бюджет' || label === 'Выручка') {
    const number = Number(value);
    if (!isNaN(number)) {
      displayValue = number.toLocaleString('ru-RU') + ' руб.';
    } else {
      displayValue += ' руб.';
    }
  }

  return (
    <div className="info-row">
      <span className="label">{label}</span>
      <span className="value">{displayValue}</span>
    </div>
  );
};

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const favorites = useAppSelector((state) => state.favorites.list);
  const dispatch = useAppDispatch();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const loading = false; 

  if (!id || id.trim() === '') {
    return <div style={{ color: '#fff', padding: '20px', textAlign: 'center' }}>ID фильма не передан в URL</div>;
  }

  const targetId = Number(id.trim());
  const movie = mockMovies.find((m) => m.id === targetId);

  if (!movie) {
    return (
      <div style={{ color: '#fff', padding: '20px', textAlign: 'center' }}>
        Фильм с ID <strong>{targetId}</strong> не найден в базе данных.
      </div>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === String(movie.id));
  const trailerId = movie.trailerUrl ?? '';

  return (
    <main className="movie-page">
      <section className="movie-section">
        <div className='movie-section-wrapper'>
          <div className='movie-info'>
            <div className='movie-info-wrapper'>
              <p className={`movie-rating ${getRatingClass(movie.rating)}`}>
                <StarIcon /> {movie.rating}
              </p>
              <p className="movie-year">{movie.year}</p>
              <p className="movie-genre">{movie.genre}</p>
              <p className="movie-duration">{movie.duration}</p>
            </div>

            <h1 className="movie-info-title">{movie.title}</h1>
            <p className="movie-overview">{movie.overview || 'Описание недоступно'}</p>

            <div className="movie-actions">
              <button
                className="btn btn-primary"
                onClick={() => setIsTrailerOpen(true)}
                disabled={loading}
              >
                Трейлер
              </button>
              
              <FavoriteIconButton
                movieId={movie.id}
                movieTitle={movie.title}
                moviePoster={movie.poster}
                isFavorite={isFavorite}
              />
            </div>
          </div>
          <div className='movie-info-poster'>
            <img 
              className='movie-info-img'
              src={movie.poster} 
              alt={movie.title} 
            />
          </div>
        </div>

        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          videoId={trailerId}
        />
      </section>

      <section className="movie-info-section">
        <h2 className="movie-info-title">О фильме</h2>
        <div className="info-rows">
          <InfoRow label="Язык оригинала" value={movie.originalLanguage} />
          <InfoRow label="Бюджет" value={movie.budget} />
          <InfoRow label="Выручка" value={movie.revenue} />
          <InfoRow label="Режиссёр" value={movie.director} />
          <InfoRow label="Продакшен" value={movie.production} />
          <InfoRow label="Награды" value={movie.awards} />
        </div>
      </section>
    </main>
  );
};






