import React from 'react';
import styles from './Loading.module.css';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner}></div>
      <p className={styles.loading__text}>Загрузка фильмов...</p>
    </div>
  );
};

export default Loading;