import React, { useState, useCallback } from 'react';
import { SearchBarProps } from '../../types/movie';
import styles from './SearchBar.module.css';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Поиск фильмов..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  }, [query, onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  }, [onSearch]);

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.search__input}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        aria-label="Поиск фильмов"
      />
      <button type="submit" className={styles.search__button} aria-label="Найти">
        <svg className={styles.search__icon} viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;