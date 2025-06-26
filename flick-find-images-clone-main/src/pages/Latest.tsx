
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieRow from '@/components/MovieRow';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getTrendingMovies, getTopRatedMovies } from '@/services/movieService';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

const Latest = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const [trending, topRated] = await Promise.all([
          getTrendingMovies(),
          getTopRatedMovies()
        ]);
        
        setTrendingMovies(trending);
        setTopRatedMovies(topRated);
      } catch (error) {
        console.error('Error fetching latest content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatest();
  }, []);

  const handleSearch = () => {
    // Search functionality for consistency
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onSearch={handleSearch} />
      
      <div className="pt-20">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="px-4 md:px-16 py-8">
            <h1 className="text-white text-3xl font-bold mb-8">Latest & Popular</h1>
            <MovieRow title="Trending This Week" movies={trendingMovies} />
            <MovieRow title="Top Rated" movies={topRatedMovies} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Latest;
