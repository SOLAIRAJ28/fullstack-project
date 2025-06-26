
import React, { useState, useEffect } from 'react';
import MovieRow from './MovieRow';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

const RecentlyWatched: React.FC = () => {
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const recentlyWatched = localStorage.getItem('recentlyWatched');
    if (recentlyWatched) {
      setRecentMovies(JSON.parse(recentlyWatched));
    }
  }, []);

  if (recentMovies.length === 0) return null;

  return <MovieRow title="Recently Watched" movies={recentMovies} />;
};

export default RecentlyWatched;
