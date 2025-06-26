
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieRow from '@/components/MovieRow';
import LoadingSpinner from '@/components/LoadingSpinner';
import SearchResults from '@/components/SearchResults';
import { getPopularMovies, searchMovies } from '@/services/movieService';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

const Movies = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieList = await getPopularMovies();
        setMovies(movieList);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onSearch={handleSearch} />
      
      {searchQuery ? (
        <div className="pt-20">
          <div className="px-4 md:px-16 py-4">
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-white transition-colors mb-4"
            >
              ← Back to Movies
            </button>
          </div>
          {isSearching ? (
            <LoadingSpinner />
          ) : (
            <SearchResults movies={searchResults} query={searchQuery} />
          )}
        </div>
      ) : (
        <div className="pt-20">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="px-4 md:px-16 py-8">
              <h1 className="text-white text-3xl font-bold mb-8">Movies</h1>
              <MovieRow title="Popular Movies" movies={movies} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
