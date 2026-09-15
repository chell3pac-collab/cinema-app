import type { Movie } from '../data/movies.mock';
import StarIcon from '../assets/StarIcon.svg?react';
import { getRatingClass } from '../utils/ratingClass';
import './SearchDropdown.css'

interface SearchDropdownProps {
  results: Movie[];
  onSelect: (movie: Movie) => void;
}



export const SearchDropdown = ({ results, onSelect }: SearchDropdownProps) => {
  return (
    <div className="search-dropdown">
      {results.map((movie) => (
        <div
          key={movie.id}
          className="search-result-item"
          onClick={() => onSelect(movie)}
        >
          <img src={movie.poster} alt={movie.title} className="search-poster" />
          <div className="search-info">
            <div className='search-info-wrapper'>
              <p className={`search-rating ${getRatingClass(movie.rating)}`}>
                <StarIcon className="search-star-icon" /> {movie.rating}
              </p>
              <p className='search-interface'>{movie.year}</p>
              <p className='search-interface'>{movie.genre}</p>
              <p className='search-interface'>{movie.duration}</p>
            </div>
            <h4 className='search-title'>{movie.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};
