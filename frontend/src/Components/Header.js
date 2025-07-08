import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, MapPin } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state: cartState } = useCart();
  const { state: authState, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    'Grocery', 'Electronics', 'Clothing', 'Home', 'Pharmacy', 'Auto', 'Services'
  ];

  return (
    <header className="bg-blue-600 text-white">
      {/* Top Bar */}
      <div className="bg-blue-700 py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Store finder
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/pharmacy" className="hover:text-yellow-300">Pharmacy</Link>
            <Link to="/auto" className="hover:text-yellow-300">Auto Center</Link>
            <Link to="/services" className="hover:text-yellow-300">Services</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-yellow-300">
            Walmart
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search everything at Walmart online and in store"
                className="w-full px-4 py-2 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {/* Account */}
            <div className="relative">
              {authState.isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="text-sm">Hi, {authState.user?.name}</span>
                  <button
                    onClick={signOut}
                    className="text-sm text-yellow-300 hover:text-yellow-400"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="flex items-center space-x-1 hover:text-yellow-300"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">Sign In</span>
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center space-x-1 hover:text-yellow-300 relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-300 text-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartState.itemCount}
                </span>
              )}
              <span className="text-sm">${cartState.total.toFixed(2)}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-blue-700 border-t border-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 py-3 pr-4 hover:bg-blue-600 rounded"
            >
              <Menu className="w-5 h-5" />
              <span className="text-sm">All Departments</span>
            </button>
            <div className="flex space-x-6 ml-6">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products/${category.toLowerCase()}`}
                  className="py-3 text-sm hover:text-yellow-300"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-blue-700 border-t border-blue-600 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/products/${category.toLowerCase()}`}
                    className="py-2 text-sm hover:text-yellow-300 border-b border-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;