import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { searchProducts } from '../data/products';
import ProductCard from '../Components/ProductCard';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
 const [results, setResults] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      let searchResults = searchProducts(query);
      
      // Apply sorting
      if (sortBy === 'price-low') {
        searchResults = searchResults.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        searchResults = searchResults.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        searchResults = searchResults.sort((a, b) => b.rating - a.rating);
      }
      
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchParams, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results Header */}
        {searchQuery && (
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Search Results for "{searchQuery}"
              </h1>
              <p className="text-gray-600 mt-1">
                {results.length} product{results.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        )}

        {/* Results */}
        {!searchQuery ? (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Walmart</h2>
            <p className="text-gray-600">
              Find everything you need from groceries to electronics
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No results found</h2>
            <p className="text-gray-600 mb-6">
              Try searching with different keywords or check your spelling
            </p>
            <div className="text-left max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-2">Search suggestions:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use more general terms</li>
                <li>• Check your spelling</li>
                <li>• Try different keywords</li>
                <li>• Use fewer words</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;