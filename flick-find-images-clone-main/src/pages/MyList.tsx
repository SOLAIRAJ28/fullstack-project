
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

const MyList = () => {
  const [myList, setMyList] = useState<Movie[]>([]);

  useEffect(() => {
    const savedList = localStorage.getItem('myList');
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }
  }, []);

  const removeFromList = (movieId: number) => {
    const updatedList = myList.filter(movie => movie.id !== movieId);
    setMyList(updatedList);
    localStorage.setItem('myList', JSON.stringify(updatedList));
  };

  const handleSearch = () => {
    // Search functionality for consistency
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onSearch={handleSearch} />
      
      <div className="pt-20 px-4 md:px-16 py-8 min-h-screen">
        <h1 className="text-white text-3xl font-bold mb-8">My List</h1>
        
        {myList.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-white text-2xl font-semibold mb-4">
              Your list is empty
            </h2>
            <p className="text-gray-400">
              Add movies and TV shows to your list to watch them later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {myList.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                showRemove={true}
                onRemove={removeFromList}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
