
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieRow from '@/components/MovieRow';
import LoadingSpinner from '@/components/LoadingSpinner';
import SearchResults from '@/components/SearchResults';
import { getTVShows, searchTVShows, Movie } from '@/services/movieService';

const TVShows = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [tvShows, setTVShows] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const shows = await getTVShows();
        setTVShows(shows);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    try {
      const results = await searchTVShows(query);
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
              ← Back to TV Shows
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
              <h1 className="text-white text-3xl font-bold mb-8">TV Shows</h1>
              <MovieRow title="Popular TV Shows" movies={tvShows} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TVShows;
