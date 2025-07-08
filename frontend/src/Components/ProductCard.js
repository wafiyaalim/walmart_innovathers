import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../Context/CartContext';

const ProductCard= ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      }
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-sm text-green-600 font-medium">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-3">{product.shippingInfo}</p>

          {!product.inStock && (
            <p className="text-sm text-red-600 mb-3">Out of stock</p>
          )}
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <button
          onClick={addToCart}
          disabled={!product.inStock}
          className={`w-full py-2 px-4 rounded-full font-medium transition-colors flex items-center justify-center space-x-2 ${
            product.inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;