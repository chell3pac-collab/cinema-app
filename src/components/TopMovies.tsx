import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { MovieCard } from '../components/MovieCard';
import './TopMovies.css'

export const TopMovies = () => {
  const { topMovies } = useSelector((state: RootState) => state.movies);

  return (
    <section className="top-movies">
      <h2 className="top-movies-title">Топ 10 фильмов</h2>
      <div className="top-movies-grid">
        {topMovies.map((movie, index) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            index={index} 
          />
        ))}
      </div>
    </section>
  );
};

