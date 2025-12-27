export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  director: string;
  duration: string;
  rating: number;
  description: string;
  poster: string;
  trailer: string;
}

export interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}