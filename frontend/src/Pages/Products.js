import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { products, getProductsByCategory } from '../data/products';
import ProductCard from '../Components/ProductCard';

const Products = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    let filtered = category ? getProductsByCategory(category) : products;
    
    // Apply filters
    filtered = filtered.filter(product => {
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesRating = selectedRating === 0 || product.rating >= selectedRating;
      return matchesPrice && matchesRating;
    });

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [category, sortBy, priceRange, selectedRating]);

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{categoryTitle}</h1>
            <p className="text-gray-600 mt-1">{filteredProducts.length} products found</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-md p-6 h-fit">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </h3>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Minimum Rating</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={selectedRating === rating}
                      onChange={(e) => setSelectedRating(Number(e.target.value))}
                      className="mr-2"
                    />
                    <span className="text-sm">{rating}+ Stars</span>
                  </label>
                ))}
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={0}
                    checked={selectedRating === 0}
                    onChange={(e) => setSelectedRating(Number(e.target.value))}
                    className="mr-2"
                  />
                  <span className="text-sm">All Ratings</span>
                </label>
              </div>
            </div>

            <button
              onClick={() => {
                setPriceRange({ min: 0, max: 2000 });
                setSelectedRating(0);
              }}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;