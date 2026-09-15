import { Link, useParams } from 'react-router-dom';
import { mockMovies } from '../data/movies.mock';
import ChevronIcon from '../assets/chevron.svg?react';
import './GenreListPage.css';
import { useState, useLayoutEffect } from 'react';

export const GenreListPage = () => {
  const { genre } = useParams<{ genre: string }>();

  if (!genre) {
    return <div style={{ color: '#fff', padding: '20px' }}>Жанр не указан</div>;
  }

  const targetGenre = genre.toLowerCase();

  const filteredMovies = mockMovies.filter((movie) => {
    if (!movie.genre) return false;
    const movieGenres = movie.genre
      .split(',')
      .map((g) => g.trim().toLowerCase())
      .filter(Boolean);
    return movieGenres.some((g) => g === targetGenre);
  });

  const [isMobile, setIsMobile] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDisplayedCount((prev) => {
        if (prev !== 15 && prev !== 5) return prev;
        return mobile ? 5 : 15;
      });
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentMovies = filteredMovies.slice(0, displayedCount);
  const hasMore = displayedCount < filteredMovies.length;

  const handleShowMore = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const increment = isMobile ? 5 : 10;
    setDisplayedCount((prev) => prev + increment);
    setIsLoading(false);
  };

  if (filteredMovies.length === 0) {
    return (
      <div className='genre-empty-message'>
        К сожалению, фильмов в жанре "{genre}" пока нет.
      </div>
    );
  }

  return (
    <main className="genre-list-page">
      <h1 className="genre-list-title">
        <Link to="/genres" className="back-link">
          <ChevronIcon className="back-icon" />
        </Link>
        <span>{genre}</span>
      </h1>

      <div className="genre-list-grid">
        {currentMovies.map((movie, index) => (
          <Link
            key={`${movie.id}-${index}`}
            to={`/movie/${movie.id}`}
            className="genre-list-link"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="genre-list-movie-card">
              <img
                src={movie.poster}
                alt={movie.title}
                className="genre-list-poster"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={handleShowMore}
          disabled={isLoading}
          className="show-more-btn"
        >
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            <span>Показать ещё</span>
          )}
        </button>
      )}
    </main>
  );
};





