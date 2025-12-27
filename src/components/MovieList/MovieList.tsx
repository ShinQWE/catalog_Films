import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Movie } from '../../types/movie';
import { fetchMovies, searchMovies } from '../../services/api';
import MovieCard from '../MovieCard/MovieCard';
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading';
import styles from './MovieList.module.css';

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMovies();
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      setError('Не удалось загрузить фильмы. Пожалуйста, попробуйте позже.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredMovies(movies);
      return;
    }

    try {
      const results = await searchMovies(query);
      setFilteredMovies(results);
    } catch (err) {
      console.error('Search error:', err);
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [movies]);

  const handleMovieClick = useCallback((movie: Movie) => {
    console.log('Selected movie:', movie.title);
  }, []);

  const sortedMovies = useMemo(() => {
    return [...filteredMovies].sort((a, b) => b.rating - a.rating);
  }, [filteredMovies]);

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <div className={styles.movielist__error}>
          <div className={styles.movielist__errorIcon}>⚠️</div>
          <p className={styles.movielist__errorText}>{error}</p>
          <button 
            onClick={loadMovies}
            className={styles.movielist__retryButton}
          >
            Попробовать снова
          </button>
        </div>
      );
    }

    if (sortedMovies.length === 0) {
      return (
        <div className={styles.movielist__empty}>
          <div className={styles.movielist__emptyIcon}>🎬</div>
          <p className={styles.movielist__emptyText}>
            {searchQuery ? 'Фильмы по вашему запросу не найдены' : 'Фильмы не найдены'}
          </p>
        </div>
      );
    }

    return (
      <div className={styles.movielist__grid}>
        {sortedMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={handleMovieClick}
          />
        ))}
      </div>
    );
  };

  return (
    <main className={styles.movielist}>
      <header className={styles.movielist__header}>
        <h1 className={styles.movielist__title}>Каталог фильмов</h1>
        <p className={styles.movielist__subtitle}>
          {sortedMovies.length} фильмов в коллекции
        </p>
        <SearchBar onSearch={handleSearch} />
      </header>
      {renderContent()}
    </main>
  );
};

export default MovieList;