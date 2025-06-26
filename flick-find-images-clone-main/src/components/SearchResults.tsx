
import React from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface SearchResultsProps {
  movies: Movie[];
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ movies, query }) => {
  if (movies.length === 0) {
    return (
      <div className="px-4 md:px-16 py-8">
        <h2 className="text-white text-2xl font-semibold mb-4">
          No results found for "{query}"
        </h2>
        <p className="text-gray-400">Try searching for a different movie or TV show.</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-16 py-8">
      <h2 className="text-white text-2xl font-semibold mb-6">
        Search results for "{query}"
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
