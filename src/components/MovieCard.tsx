import { Link } from 'react-router-dom';
import type { Movie } from '../data/movies.mock';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  index: number; 
}

export const MovieCard = ({ movie, index }: MovieCardProps) => {
  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="movie-card-link" 
      style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="movie-card">
        <div className="poster-wrapper">
          <span className="card-number">{index + 1}</span>
          
          <img
            src={movie.poster}
            alt={movie.title}
            className="movie-poster"
            loading="lazy"
          />
        </div>       
      </div>
    </Link>
  );
};
