
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Heart, X } from 'lucide-react';

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

interface MovieCardProps {
  movie: Movie;
  showRemove?: boolean;
  onRemove?: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showRemove = false, onRemove }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 1000) + 100);
  const [isHovered, setIsHovered] = useState(false);
  
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';

  const title = movie.title || movie.name || 'Unknown Title';
  const releaseDate = movie.release_date || movie.first_air_date || '';

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/movie/${movie.id}`);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to recently watched
    const recentlyWatched = JSON.parse(localStorage.getItem('recentlyWatched') || '[]');
    const updatedRecent = [movie, ...recentlyWatched.filter((item: any) => item.id !== movie.id)].slice(0, 10);
    localStorage.setItem('recentlyWatched', JSON.stringify(updatedRecent));
    
    alert(`Now playing: ${title}`);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    const savedList = localStorage.getItem('myList');
    const myList = savedList ? JSON.parse(savedList) : [];
    
    if (!myList.some((item: any) => item.id === movie.id)) {
      myList.push(movie);
      localStorage.setItem('myList', JSON.stringify(myList));
      console.log('Added to list:', title);
    }
  };

  const handleRemoveFromList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(movie.id);
    }
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div 
      className="flex-shrink-0 w-48 cursor-pointer relative transform transition-all duration-300 hover:scale-105 hover:z-20"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-72 object-cover transition-transform duration-300"
        />
        
        {/* Hover overlay - only show when this specific card is hovered */}
        <div className={`absolute inset-0 bg-black/90 transition-all duration-300 flex flex-col justify-between p-4 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Top section with play button */}
          <div className="flex justify-center">
            <button 
              onClick={handlePlayClick}
              className={`bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-all duration-300 ${
                isHovered ? 'translate-y-0' : 'translate-y-4'
              }`}
            >
              <Play size={16} fill="black" />
            </button>
          </div>
          
          {/* Middle section with movie info */}
          <div className="text-center">
            <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{title}</h3>
            <p className="text-gray-300 text-xs mb-2 line-clamp-3">{movie.overview}</p>
            <p className="text-gray-400 text-xs">
              {releaseDate && new Date(releaseDate).getFullYear()} • ⭐ {movie.vote_average.toFixed(1)}
            </p>
          </div>
          
          {/* Bottom section with actions */}
          <div className="flex justify-center space-x-2">
            <button 
              onClick={handleLikeToggle}
              className={`transition-colors ${isLiked ? 'text-red-500' : 'text-white hover:text-red-300'}`}
            >
              <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            {showRemove ? (
              <button 
                onClick={handleRemoveFromList}
                className="text-white hover:text-red-300 transition-colors"
              >
                <X size={14} />
              </button>
            ) : (
              <button 
                onClick={handleAddToList}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Plus size={14} />
              </button>
            )}
            <div className="text-gray-400 text-xs">❤️ {likeCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
