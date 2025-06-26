import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import TrendingCarousel from '@/components/TrendingCarousel';
import RecentlyWatched from '@/components/RecentlyWatched';
import SearchResults from '@/components/SearchResults';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getPopularMovies, getTrendingMovies, getTopRatedMovies, searchMovies } from '@/services/movieService';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Redirect to signup page only if not logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/signup', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popular, trending, topRated] = await Promise.all([
          getPopularMovies(),
          getTrendingMovies(),
          getTopRatedMovies()
        ]);
        
        setPopularMovies(popular);
        setTrendingMovies(trending);
        setTopRatedMovies(topRated);
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

  if (searchQuery) {
    return (
      <div className="min-h-screen bg-black">
        <Header onSearch={handleSearch} />
        <div className="pt-20">
          <div className="px-4 md:px-16 py-4">
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-white transition-colors mb-4"
            >
              ← Back to Home
            </button>
          </div>
          {isSearching ? (
            <LoadingSpinner />
          ) : (
            <SearchResults movies={searchResults} query={searchQuery} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header onSearch={handleSearch} />
      
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="pt-16">
          <Hero />
          
          <div className="px-4 md:px-16 py-8">
            <div className="mb-8">
              <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">Trending Now</h2>
              <TrendingCarousel />
            </div>
            
            <RecentlyWatched />
            <MovieRow title="Popular Movies" movies={popularMovies} />
            <MovieRow title="Trending This Week" movies={trendingMovies} />
            <MovieRow title="Top Rated" movies={topRatedMovies.slice(0, -1)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
