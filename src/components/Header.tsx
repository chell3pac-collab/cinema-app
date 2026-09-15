import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockMovies, type Movie } from '../data/movies.mock';
import './Header.css';
import LogoIcon from '../assets/logo-white.svg?react';
import SearchIcon from '../assets/SearchIcon.svg?react';
import { SearchDropdown } from './SearchDropdown';
import GenresIcon from '../assets/genresIcon.svg?react';
import UserIcon from '../assets/UserIcon.svg?react';
import CloseIcon from '../assets/close-icon.svg?react';

interface HeaderProps {
  isAuthenticated: boolean;
  userFullName: string;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  userFullName,
  onOpenAuth,
}) => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const performSearch = (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsOpen(true);

    const filtered = mockMovies.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(q.toLowerCase());
      const genreMatch = movie.genre.toLowerCase().includes(q.toLowerCase());
      return titleMatch || genreMatch;
    });

    setResults(filtered.slice(0, 5));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    performSearch(val);
  };

  const handleSelectMovie = (movie: Movie) => {
    setQuery(movie.title);
    setResults([]);
    setIsOpen(false);
    navigate(`/movie/${movie.id}`);
    setIsSearchExpanded(false); 
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    if (searchInputRef.current) searchInputRef.current.focus();
  };

  const handleToggleSearch = () => {
    setIsSearchExpanded(prev => !prev);
  };

  const handleCloseSearch = () => {
    setIsSearchExpanded(false);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (window.innerWidth <= 850 && isSearchExpanded) {
          setIsSearchExpanded(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchExpanded]);

  // Автофокус при раскрытии
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const userName = isAuthenticated ? userFullName.split(' ') : '';

  return (
    <header className="app-header">
      <div className="logo" onClick={() => navigate('/')}>
        <LogoIcon className='logo-icon' />
      </div>
      <div className='wrapper'>
        <div className='logo-wrapper'>
          <nav className="nav-wrapper">
            <Link className="nav-links active" to="/">Главная</Link>
            <Link className="nav-links active" to="/genres">Жанры</Link>
            <Link className='nav-link-mobile' to="/genres"><GenresIcon className="nav-icon" /></Link>
          </nav>

          <div 
            ref={searchContainerRef} 
            className={`search-input-wrapper ${isSearchExpanded ? 'expanded' : ''}`}>
            <SearchIcon className="search-icon" />

            <button 
              type="button" 
              className="search-toggle-btn"
              onClick={handleToggleSearch}
              aria-label="Открыть поиск"
            >
              <SearchIcon className="search-icon-mobile" />
            </button>

            <button 
              type="button" 
              className="search-close-btn"
              onClick={handleCloseSearch}
              aria-label="Закрыть поиск"
            >
              <CloseIcon className="search-close-icon"/>
            </button>

            <input
              ref={searchInputRef}
              className="search"
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Поиск"
              aria-autocomplete="list"
            />

            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="search-clear-btn"
                aria-label="Очистить поиск"
              >
                <CloseIcon className="search-close-icon"/>
              </button>
            )}

            {isOpen && results.length > 0 && (
              <div ref={dropdownRef} className="search-dropdown-container">
                <SearchDropdown results={results} onSelect={handleSelectMovie} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="profile-actions">
          {isAuthenticated ? (
            <div className="profile-btn-group">
              <Link to="/account" className="profile-btn">
                <span className="profile-name active">{userName}</span>
                <UserIcon className='profile-icon' />
              </Link>
            </div>
          ) : (
            <button className="login-btn active" onClick={onOpenAuth}>
              Войти
            </button>
          )}
        </div>
    </header>
  );
};

export default Header;
