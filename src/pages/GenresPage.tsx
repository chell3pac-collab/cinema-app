import { Link } from 'react-router-dom';
import { genresData } from '../data/genres.mock';
import './GenresPage.css';

export const GenresPage = () => {
  return (
    <main className="genres-page">
      <h1 className="genres-title">Жанры фильмов</h1>
      
      <div className="genres-grid">
        {genresData.map((genre) => (
          <Link 
            to={`/genres/${genre.name.toLowerCase()}`} 
            key={genre.id}
            className="genre-card"
          >
            <img
              src={genre.image}
              alt={genre.name}
              className="genre-card-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/no-genre.png'; 
              }}
            />
            <div className="genre-overlay">
              <span className="genre-name">{genre.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};
