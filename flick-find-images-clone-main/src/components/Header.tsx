
import React, { useState, useEffect } from 'react';
import { Search, Bell, User, LogOut, Crown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SubscriptionModal from './SubscriptionModal';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const subscription = localStorage.getItem('subscription');
    if (subscription) {
      const subData = JSON.parse(subscription);
      const endDate = new Date(subData.endDate);
      const today = new Date();
      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(Math.max(0, diffDays));
    }
  }, [showSubscription]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 md:px-16 py-4">
          <div className="flex items-center space-x-8">
            <Link to="" className="text-red-600 text-2xl font-bold hover:text-red-500 transition-colors">
              NETFLIX
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/home" 
                className={`transition-colors ${
                  isActive('/') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/tv-shows" 
                className={`transition-colors ${
                  isActive('/tv-shows') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                }`}
              >
                TV Shows
              </Link>
              <Link 
                to="/movies" 
                className={`transition-colors ${
                  isActive('/movies') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                }`}
              >
                Movies
              </Link>
              <Link 
                to="/latest" 
                className={`transition-colors ${
                  isActive('/latest') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                }`}
              >
                Latest
              </Link>
              <Link 
                to="/my-list" 
                className={`transition-colors ${
                  isActive('/my-list') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                }`}
              >
                My List
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {daysRemaining > 0 && (
              <div className="text-yellow-400 text-sm flex items-center space-x-1">
                <Crown size={16} />
                <span>{daysRemaining}d</span>
              </div>
            )}
            <button
              onClick={() => setShowSubscription(true)}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Subscribe
            </button>
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies, TV shows..."
                    className="bg-black/80 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white w-64"
                    autoFocus
                  />
                  <button type="submit" className="ml-2 text-white hover:text-gray-300">
                    <Search size={20} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Search size={20} />
                </button>
              )}
            </div>
            <Bell className="text-white hover:text-gray-300 cursor-pointer transition-colors" size={20} />
            <div className="relative group">
              <User className="text-white hover:text-gray-300 cursor-pointer transition-colors" size={20} />
              <div className="absolute right-0 top-8 bg-black/90 border border-gray-600 rounded-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors px-4 py-2 whitespace-nowrap"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <SubscriptionModal 
        isOpen={showSubscription} 
        onClose={() => setShowSubscription(false)} 
      />
    </>
  );
};

export default Header;
