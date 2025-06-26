
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ThumbsDown, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import MovieCard from '@/components/MovieCard';
import { getMovieDetails, getPopularMovies } from '@/services/movieService';

interface MovieDetails {
  id: number;
  title: string;
  name?: string; // For TV shows
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  first_air_date?: string; // For TV shows
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
}

interface Movie {
  id: number;
  title: string;
  name?: string;
  poster_path: string;
  overview: string;
  release_date: string;
  first_air_date?: string;
  vote_average: number;
}

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInMyList, setIsInMyList] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  const availableLanguages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Japanese',
    'Korean'
  ];

useEffect(() => {
  const fetchMovieDetails = async () => {
    if (!id) return;

    try {
      const movieDetails = await getMovieDetails(parseInt(id));
      if (movieDetails.error) {
        setMovie(null);
      } else {
        setMovie(movieDetails);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setMovie(null);
    } finally {
      setIsLoading(false);
    }
  };

  fetchMovieDetails();
}, [id]);


  const addToMyList = () => {
    if (!movie) return;
    
    const savedList = localStorage.getItem('myList');
    const myList = savedList ? JSON.parse(savedList) : [];
    
    if (!isInMyList) {
      myList.push(movie);
      localStorage.setItem('myList', JSON.stringify(myList));
      setIsInMyList(true);
    }
  };

  const handlePlay = () => {
    if (!movie) return;
    
    // Add to recently watched
    const recentlyWatched = JSON.parse(localStorage.getItem('recentlyWatched') || '[]');
    const updatedRecent = [movie, ...recentlyWatched.filter((item: any) => item.id !== movie.id)].slice(0, 10);
    localStorage.setItem('recentlyWatched', JSON.stringify(updatedRecent));
    
    alert(`Now playing: ${movie.title || movie.name} in ${selectedLanguage}`);
  };

  const handleSearch = () => {
    // Search functionality for consistency
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Header onSearch={handleSearch} />
        <LoadingSpinner />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black">
        <Header onSearch={handleSearch} />
        <div className="pt-20 px-4 md:px-16 py-8">
          <h1 className="text-white text-2xl">Content not found</h1>
          <p className="text-gray-400 mt-4">The requested movie or TV show could not be found.</p>
        </div>
      </div>
    );
  }

  const backgroundImage = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path 
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';

  const title = movie.title || movie.name || 'Unknown Title';
  const releaseDate = movie.release_date || movie.first_air_date || '';

  return (
    <div className="min-h-screen bg-black">
      <Header onSearch={handleSearch} />
      
      <div className="relative">
        <div 
          className="w-full h-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.3) 100%), url('${backgroundImage}')`
          }}
        />
        
        <div className="absolute inset-0 flex items-center px-4 md:px-16 pt-20">
          <div className="max-w-2xl">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white transition-colors mb-4"
            >
              ← Back
            </button>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {title}
            </h1>
            
            <div className="text-white mb-4">
              <span className="text-green-500 font-semibold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span className="ml-4">{releaseDate && new Date(releaseDate).getFullYear()}</span>
              {movie.runtime && <span className="ml-4">{movie.runtime} min</span>}
            </div>
            
            <p className="text-lg text-gray-200 mb-6 leading-relaxed">
              {movie.overview}
            </p>

            {/* Language Selection */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                <Globe className="inline w-4 h-4 mr-2" />
                Audio Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-gray-400"
              >
                {availableLanguages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-4 mb-8">
              <button 
                onClick={handlePlay}
                className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
              >
                <Play size={20} fill="black" />
                <span>Play</span>
              </button>
              
              <button
                onClick={addToMyList}
                className={`flex items-center space-x-2 px-8 py-3 rounded font-semibold transition-colors ${
                  isInMyList 
                    ? 'bg-gray-600 text-white cursor-not-allowed' 
                    : 'bg-gray-600/70 text-white hover:bg-gray-600/90'
                }`}
                disabled={isInMyList}
              >
                <Plus size={20} />
                <span>{isInMyList ? 'Added to List' : 'My List'}</span>
              </button>
              
              <button className="p-3 border-2 border-gray-600 rounded-full text-white hover:border-white transition-colors">
                <ThumbsUp size={20} />
              </button>
              
              <button className="p-3 border-2 border-gray-600 rounded-full text-white hover:border-white transition-colors">
                <ThumbsDown size={20} />
              </button>
            </div>
            
            {movie.genres && movie.genres.length > 0 && (
              <div className="text-gray-300">
                <span className="text-white font-semibold">Genres: </span>
                {movie.genres.map(genre => genre.name).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Movies Section */}
{/* {similarMovies.length > 0 && (
  <div className="px-4 md:px-16 py-8 bg-black">
    <h2 className="text-white text-2xl font-semibold mb-6">More Like This</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {similarMovies.map((similarMovie) => (
        <div key={similarMovie.id} className="transform scale-75 origin-top-left">
          <MovieCard movie={similarMovie} />
        </div>
      ))}
    </div>
  </div>
)} */}

    </div>
  );
};

export default MovieDetails;
