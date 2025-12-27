import React, { useState, useCallback } from 'react';
import { MovieCardProps } from '../../types/movie';
import styles from './MovieCard.module.css';

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = useCallback(() => {
    onClick(movie);
    setIsModalOpen(true);
  }, [movie, onClick]);

  const handleCloseModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  }, []);

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <article className={styles.card} onClick={handleCardClick}>
        <img 
          src={movie.poster} 
          alt={`Постер фильма "${movie.title}"`}
          className={styles.card__image}
          loading="lazy"
        />
        <div className={styles.card__content}>
          <h3 className={styles.card__title}>{movie.title}</h3>
          <div className={styles.card__meta}>
            <span className={styles.card__year}>{movie.year}</span>
            <span className={styles.card__genre}>{movie.genre}</span>
          </div>
          <p className={styles.card__director}>Режиссер: {movie.director}</p>
          <p className={styles.card__description}>{movie.description}</p>
          <div className={styles.card__footer}>
            <span className={styles.card__duration}>{movie.duration}</span>
            <span className={styles.card__rating}>★ {movie.rating}</span>
          </div>
        </div>
      </article>

      {isModalOpen && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <button 
            className={styles.modal__close}
            onClick={handleCloseModal}
            aria-label="Закрыть"
          >
            ×
          </button>
          <div className={styles.modal__content} onClick={handleModalClick}>
            <div className={styles.modal__body}>
              <img 
                src={movie.poster} 
                alt={`Постер фильма "${movie.title}"`}
                className={styles.modal__image}
              />
              <div className={styles.modal__info}>
                <h2 className={styles.modal__title}>{movie.title}</h2>
                <div className={styles.modal__details}>
                  <div className={styles.modal__detail}>
                    <span className={styles.modal__label}>Год</span>
                    <span className={styles.modal__value}>{movie.year}</span>
                  </div>
                  <div className={styles.modal__detail}>
                    <span className={styles.modal__label}>Жанр</span>
                    <span className={styles.modal__value}>{movie.genre}</span>
                  </div>
                  <div className={styles.modal__detail}>
                    <span className={styles.modal__label}>Длительность</span>
                    <span className={styles.modal__value}>{movie.duration}</span>
                  </div>
                  <div className={styles.modal__detail}>
                    <span className={styles.modal__label}>Рейтинг</span>
                    <span className={styles.modal__value}>★ {movie.rating}</span>
                  </div>
                </div>
                <div className={styles.modal__detail}>
                  <span className={styles.modal__label}>Режиссер</span>
                  <span className={styles.modal__value}>{movie.director}</span>
                </div>
                <p className={styles.modal__description}>{movie.description}</p>
                <a 
                  href={movie.trailer} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.modal__trailer}
                >
                  Смотреть трейлер
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;