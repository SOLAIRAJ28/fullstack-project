
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTrendingMovies } from '@/services/movieService';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

const TrendingCarousel: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies.slice(0, 5)); // Get top 5 for carousel
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [movies.length]);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  if (isLoading || movies.length === 0) {
    return (
      <div className="relative h-96 bg-gray-800 animate-pulse rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white">Loading trending content...</div>
        </div>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];
  // Use poster_path as backdrop since our Movie interface doesn't have backdrop_path
  const backgroundImage = currentMovie.poster_path 
    ? `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`
    : 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

  return (
    <div className="relative h-96 overflow-hidden rounded-lg group">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('${backgroundImage}')`
        }}
      />
      
      <div className="relative z-10 h-full flex items-center px-8">
        <div className="max-w-lg">
          <h3 className="text-white text-2xl font-bold mb-2">
            {currentMovie.title}
          </h3>
          <p className="text-gray-200 text-sm mb-4 line-clamp-3">
            {currentMovie.overview}
          </p>
          <div className="text-gray-300 text-sm">
            {new Date(currentMovie.release_date).getFullYear()} • ⭐ {currentMovie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90 z-20"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90 z-20"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;
