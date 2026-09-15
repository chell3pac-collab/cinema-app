import { useState } from 'react';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (q: string) => {
    setQuery(q);
    const response = await fetch(`/api/search?q=${q}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <main>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Поиск фильмов..."
      />
      {results.length > 0 && (
        <ul>
          {results.map((movie: any) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default SearchPage;
