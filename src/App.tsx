import React from 'react';
import MovieList from './components/MovieList/MovieList';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="main-content">
        <MovieList />
      </div>
      <footer className="footer">
        <div className="footer__content">
          <p className="footer__text">С Наступаюшим 2026!</p>
        </div>
      </footer>
    </div>
  );
};

export default App;