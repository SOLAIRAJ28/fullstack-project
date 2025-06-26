
const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  name?: string; // For TV shows
  poster_path: string;
  overview: string;
  release_date: string;
  first_air_date?: string; // For TV shows
  vote_average: number;
}

// Mock data for fallbacks
export const mockMovies: MovieDetails[] = [
  {
    id: 1,
    title: 'The Dark Knight',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: '/hqkIcbrOHL86UncnHIsHVcVmzue.jpg',
    overview: 'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests of his ability to fight injustice.',
    release_date: '2008-07-18',
    vote_average: 9.0,
    runtime: 152,
    genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Drama' }]
  },
  {
    id: 2,
    title: 'Inception',
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    overview: 'A thief who steals corporate secrets through dream-sharing is given the inverse task of planting an idea.',
    release_date: '2010-07-16',
    vote_average: 8.8,
    runtime: 148,
    genres: [{ id: 1, name: 'Sci-Fi' }, { id: 2, name: 'Action' }]
  },
  {
    id: 3,
    title: 'Interstellar',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    release_date: '2014-11-07',
    vote_average: 8.6,
    runtime: 169,
    genres: [{ id: 1, name: 'Adventure' }, { id: 2, name: 'Drama' }]
  },
  {
    id: 4,
    title: 'The Matrix',
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop_path: '/icmmSD4vTTDKOq2vvdulafOGw93.jpg',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
    release_date: '1999-03-31',
    vote_average: 8.7,
    runtime: 136,
    genres: [{ id: 1, name: 'Sci-Fi' }, { id: 2, name: 'Action' }]
  },
  {
    id: 5,
    title: 'Pulp Fiction',
    poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdrop_path: '/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg',
    overview: 'The lives of two mob hitmen and others intertwine in tales of violence and redemption.',
    release_date: '1994-10-14',
    vote_average: 8.9,
    runtime: 154,
    genres: [{ id: 1, name: 'Crime' }, { id: 2, name: 'Drama' }]
  }
];

export const mockTVShows: MovieDetails[] = [
  {
    id: 1001,
    name: 'Stranger Things',
    title: 'Stranger Things',
    poster_path: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdrop_path: '/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
    release_date: '2016-07-15',
    first_air_date: '2016-07-15',
    vote_average: 8.7,
    runtime: 50,
    genres: [{ id: 1, name: 'Mystery' }, { id: 2, name: 'Sci-Fi' }]
  },
  {
    id: 1002,
    name: 'The Crown',
    title: 'The Crown',
    poster_path: '/1M876KPjulVwppEpldhdc8V4o68.jpg',
    backdrop_path: '/bP7u19opmHXYeTCUwGjlLldmUMc.jpg',
    overview: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign.',
    release_date: '2016-11-04',
    first_air_date: '2016-11-04',
    vote_average: 8.6,
    runtime: 55,
    genres: [{ id: 1, name: 'Drama' }, { id: 2, name: 'History' }]
  },
  {
    id: 1003,
    name: 'Breaking Bad',
    title: 'Breaking Bad',
    poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    backdrop_path: '/84XPpjGvxNyExjSuLQe0SzioErt.jpg',
    overview: 'A high school chemistry teacher turns to meth production to secure his family’s future.',
    release_date: '2008-01-20',
    first_air_date: '2008-01-20',
    vote_average: 9.4,
    runtime: 47,
    genres: [{ id: 1, name: 'Crime' }, { id: 2, name: 'Drama' }]
  },
  {
    id: 1004,
    name: 'Game of Thrones',
    title: 'Game of Thrones',
    poster_path: '/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
    backdrop_path: '/qsD5OHqW7DSnaQ2afwz8Ptht1Xb.jpg',
    overview: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.',
    release_date: '2011-04-17',
    first_air_date: '2011-04-17',
    vote_average: 9.2,
    runtime: 60,
    genres: [{ id: 1, name: 'Fantasy' }, { id: 2, name: 'Drama' }]
  }
];

// Define the Movie interface first
export interface Movie {
  id: number;
  title: string;
  name?: string; // For TV shows
  poster_path: string;
  overview: string;
  release_date: string;
  first_air_date?: string; // For TV shows
  vote_average: number;
}

// Define your mockPopularMovies array here
const mockPopularMovies = [
  {
    id: 201,
    title: 'Avengers: Endgame',
    name: 'Avengers: Endgame',
    poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    overview: 'After the devastating events of Avengers: Infinity War, the universe is in ruins...',
    release_date: '2019-04-26',
    first_air_date: '2019-04-26',
    vote_average: 8.3,
    runtime: 181,
    genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 878, name: 'Science Fiction' }]
  },
  {
    id: 202,
    title: 'The Lion King',
    name: 'The Lion King',
    poster_path: '/dzBtMocZuJbjLOXvrl4zGYigDzh.jpg',
    backdrop_path: '/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg',
    overview: 'Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny.',
    release_date: '2019-07-19',
    first_air_date: '2019-07-19',
    vote_average: 7.1,
    runtime: 118,
    genres: [{ id: 16, name: 'Animation' }, { id: 18, name: 'Drama' }, { id: 10751, name: 'Family' }]
  },
  {
    id: 203,
    title: 'Frozen II',
    name: 'Frozen II',
    poster_path: '/qdfARIhgpgZOBh3vfNhWS4hmSo3.jpg',
    backdrop_path: '/xJWPZIYOEFIjZpBL7SVBGnzRYXp.jpg',
    overview: 'Anna, Elsa, Kristoff and Olaf leave Arendelle to travel to an ancient, autumn-bound forest...',
    release_date: '2019-11-20',
    first_air_date: '2019-11-20',
    vote_average: 7.3,
    runtime: 103,
    genres: [{ id: 16, name: 'Animation' }, { id: 10751, name: 'Family' }, { id: 12, name: 'Adventure' }]
  },
  {
    id: 204,
    title: 'Joker',
    name: 'Joker',
    poster_path: '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    backdrop_path: '/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg',
    overview: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society...',
    release_date: '2019-10-04',
    first_air_date: '2019-10-04',
    vote_average: 8.5,
    runtime: 122,
    genres: [{ id: 80, name: 'Crime' }, { id: 18, name: 'Drama' }, { id: 53, name: 'Thriller' }]
  },
  {
    id: 205,
    title: 'Toy Story 4',
    name: 'Toy Story 4',
    poster_path: '/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg',
    backdrop_path: '/dKrVegVI0UsfN3bqM4QW9aMTqzc.jpg',
    overview: 'When a new toy called "Forky" joins Woody and the gang, a road trip reveals how big the world can be for a toy.',
    release_date: '2019-06-21',
    first_air_date: '2019-06-21',
    vote_average: 7.6,
    runtime: 100,
    genres: [{ id: 16, name: 'Animation' }, { id: 35, name: 'Comedy' }, { id: 10751, name: 'Family' }]
  },
  {
    id: 206,
    title: 'Spider-Man: No Way Home',
    name: 'Spider-Man: No Way Home',
    poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    backdrop_path: '/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
    overview: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a superhero.',
    release_date: '2021-12-15',
    first_air_date: '2021-12-15',
    vote_average: 8.1,
    runtime: 148,
    genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 878, name: 'Science Fiction' }]
  },
  {
    id: 207,
    title: 'Doctor Strange in the Multiverse of Madness',
    name: 'Doctor Strange in the Multiverse of Madness',
    poster_path: '/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
    backdrop_path: '/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg',
    overview: 'Doctor Strange, with the help of mystical allies, traverses the mind-bending and dangerous alternate realities of the Multiverse.',
    release_date: '2022-05-04',
    first_air_date: '2022-05-04',
    vote_average: 7.5,
    runtime: 126,
    genres: [{ id: 14, name: 'Fantasy' }, { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }]
  },
  {
    id: 208,
    title: 'Black Widow',
    name: 'Black Widow',
    poster_path: '/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
    backdrop_path: '/VkW7v7kP3Xq8y41yuYs0Y66HU6v.jpg',
    overview: 'Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.',
    release_date: '2021-07-09',
    first_air_date: '2021-07-09',
    vote_average: 7.3,
    runtime: 134,
    genres: [{ id: 28, name: 'Action' }, { id: 53, name: 'Thriller' }]
  },
  {
    id: 209,
    title: 'Guardians of the Galaxy Vol. 3',
    name: 'Guardians of the Galaxy Vol. 3',
    poster_path: '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
    backdrop_path: '/3kA2FC5WzRZ0F4xFvVz4c2Xax5R.jpg',
    overview: 'The Guardians must fight to keep their newfound family together as they unravel the mysteries of Peter Quill\'s true parentage.',
    release_date: '2023-05-03',
    first_air_date: '2023-05-03',
    vote_average: 8.2,
    runtime: 150,
    genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 878, name: 'Science Fiction' }]
  },
  {
    id: 210,
    title: 'Dune',
    name: 'Dune',
    poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    backdrop_path: '/86L8wqGMDbwURPni2t7FQ0nDjsH.jpg',
    overview: 'Feature adaptation of Frank Herbert\'s science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.',
    release_date: '2021-09-15',
    first_air_date: '2021-09-15',
    vote_average: 8.0,
    runtime: 155,
    genres: [{ id: 12, name: 'Adventure' }, { id: 18, name: 'Drama' }, { id: 878, name: 'Science Fiction' }]
  }
];



// Define the getPopularMovies function here as well
export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) {
      console.log('API request failed, using mock popular movies');
      return mockPopularMovies;
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return mockPopularMovies;
  }
};
const mockTrendingMovies: Movie[] = [
  {
    id: 301,
    title: 'Avatar: The Way of Water',
    poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    overview: 'Jake Sully lives with his newfound family formed on the planet of Pandora.',
    release_date: '2022-12-16',
    vote_average: 7.7,
  },
  {
    id: 302,
    title: 'Black Panther: Wakanda Forever',
    poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
    overview: 'The people of Wakanda fight to protect their home from intervening world powers.',
    release_date: '2022-11-09',
    vote_average: 7.3,
  },
  {
    id: 303,
    title: 'Top Gun: Maverick',
    poster_path: '/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
    overview: 'After more than thirty years of service as one of the Navy\'s top aviators, Pete "Maverick" Mitchell is where he belongs.',
    release_date: '2022-05-24',
    vote_average: 8.4,
  },
  {
    id: 304,
    title: 'Spider-Man: No Way Home',
    poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    overview: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a superhero.',
    release_date: '2021-12-15',
    vote_average: 8.1,
  },
  {
    id: 305,
    title: 'Jurassic World Dominion',
    poster_path: '/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg',
    overview: 'Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world.',
    release_date: '2022-06-01',
    vote_average: 6.5,
  },
  
  {
    id: 307,
    title: 'Doctor Strange in the Multiverse of Madness',
    poster_path: '/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
    overview: 'Doctor Strange, with the help of mystical allies, traverses the mind-bending and dangerous alternate realities of the Multiverse.',
    release_date: '2022-05-04',
    vote_average: 7.5,
  },
  
];


export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    if (!response.ok) {
      console.log('API request failed, using mock trending movies');
      return mockTrendingMovies;
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return mockTrendingMovies;
  }
};


const mockTopRatedMovies: Movie[] = [
  {
    id: 401,
    title: 'The Shawshank Redemption',
    poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    release_date: '1994-09-23',
    vote_average: 9.3,
  },
  {
    id: 402,
    title: 'The Godfather',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    release_date: '1972-03-14',
    vote_average: 9.2,
  },
  {
    id: 403,
    title: 'The Dark Knight',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    release_date: '2008-07-18',
    vote_average: 9.0,
  },
  
  {
    id: 405,
    title: 'Schindler\'s List',
    poster_path: '/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
    overview: 'In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    release_date: '1993-12-15',
    vote_average: 8.9,
  },
  {
    id: 406,
    title: 'Pulp Fiction',
    poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    release_date: '1994-10-14',
    vote_average: 8.9,
  },
  {
    id: 407,
    title: 'The Lord of the Rings: The Return of the King',
    poster_path: '/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
    overview: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    release_date: '2003-12-01',
    vote_average: 8.9,
  },
  {
    id: 408,
    title: 'Fight Club',
    poster_path: '/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg',
    overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much more.',
    release_date: '1999-10-15',
    vote_average: 8.8,
  },
  {
    id: 409,
    title: 'Forrest Gump',
    poster_path: '/clolk7rB5lAjs41SD0Vt6IXYLMm.jpg',
    overview: 'The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.',
    release_date: '1994-07-06',
    vote_average: 8.8,
  },
  {
    id: 410,
    title: 'Inception',
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    overview: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    release_date: '2010-07-16',
    vote_average: 8.8,
  }
];

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    if (!response.ok) {
      console.log('API request failed, using mock top-rated movies');
      return mockTopRatedMovies;
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    return mockTopRatedMovies;
  }
};

export const getTVShows = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
    if (!response.ok) {
      console.log('API request failed, using mock TV shows data');
      return mockTVShows;
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return mockTVShows;
  }
};

export const searchTVShows = async (query: string): Promise<Movie[]> => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    console.log('Empty search query');
    return [];
  }
  try {
    const url = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(trimmedQuery)}`;
    console.log('Fetching URL:', url);
    const response = await fetch(url);
    if (!response.ok) {
      console.log('API request failed, filtering mock TV shows data');
      return mockTVShows.filter(show => 
        show.title.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
        (show.name && show.name.toLowerCase().includes(trimmedQuery.toLowerCase()))
      );
    }
    const data = await response.json();
    console.log('API returned results count:', data.results.length);
    return data.results;
  } catch (error) {
    console.error('Error searching TV shows:', error);
    return mockTVShows.filter(show => 
      show.title.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
      (show.name && show.name.toLowerCase().includes(trimmedQuery.toLowerCase()))
    );
  }
};


export const searchMovies = async (query: string): Promise<Movie[]> => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    console.log('Empty search query');
    return [];
  }
  try {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(trimmedQuery)}`;
    console.log('Fetching URL:', url);
    const response = await fetch(url);
    if (!response.ok) {
      console.log('API request failed, filtering mock movies data');
      return mockMovies.filter(movie =>
        movie.title.toLowerCase().includes(trimmedQuery.toLowerCase())
      );
    }
    const data = await response.json();
    console.log('API returned results count:', data.results.length);
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return mockMovies.filter(movie =>
      movie.title.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
  }
};
export const getMovieDetails = async (movieId: number): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    if (!response.ok) {
      console.log('API request failed, using mock movie details');
      const allMockData = [
        ...mockMovies,
        ...mockTVShows,
        ...mockTrendingMovies,
        ...mockTopRatedMovies,
        ...mockPopularMovies,   // <-- Add this here
      ];
      const mockMovie = allMockData.find(m => m.id === movieId);
      if (mockMovie) {
        return {
          id: mockMovie.id,
          title: mockMovie.title || mockMovie.name || 'Unknown Title',
          overview: mockMovie.overview || '',
          backdrop_path: mockMovie.backdrop_path || mockMovie.poster_path || '',
          poster_path: mockMovie.poster_path || '',
          runtime: mockMovie.runtime || 120,
          genres: mockMovie.genres || [{ id: 1, name: 'Action' }, { id: 2, name: 'Drama' }],
          vote_average: typeof mockMovie.vote_average === 'number' ? mockMovie.vote_average : 0,
          release_date: mockMovie.release_date || mockMovie.first_air_date || '',
        };
      }
      return { error: 'Content not found' };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    const allMockData = [
      ...mockMovies,
      ...mockTVShows,
      ...mockTrendingMovies,
      ...mockTopRatedMovies,
      ...mockPopularMovies,  // <-- Add here as well
    ];
    const mockMovie = allMockData.find(m => m.id === movieId);
    if (mockMovie) {
      return {
        id: mockMovie.id,
        title: mockMovie.title || mockMovie.name || 'Unknown Title',
        overview: mockMovie.overview || '',
        backdrop_path: mockMovie.backdrop_path || mockMovie.poster_path || '',
        poster_path: mockMovie.poster_path || '',
        runtime: mockMovie.runtime || 120,
        genres: mockMovie.genres || [{ id: 1, name: 'Action' }, { id: 2, name: 'Drama' }],
        vote_average: typeof mockMovie.vote_average === 'number' ? mockMovie.vote_average : 0,
        release_date: mockMovie.release_date || mockMovie.first_air_date || '',
      };
    }
    return { error: 'Content not found' };
  }
};
