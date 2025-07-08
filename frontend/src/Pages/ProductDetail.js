import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../Context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-800">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        }
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  const images = [product.image, product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-blue-600">Products</Link>
            <span>/</span>
            <Link to={`/products/${product.category}`} className="hover:text-blue-600 capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="text-lg text-green-600 font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">{product.shippingInfo}</p>
              <p className="text-sm text-gray-600 mb-4">Sold by {product.seller}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700 mr-2">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                {product.inStock ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-6 rounded-full font-medium transition-colors flex items-center justify-center space-x-2 ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Free shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">2-year warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">90-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description and Reviews */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {renderStars(5)}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">John D.</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Excellent product! Exactly as described and delivered quickly.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {renderStars(4)}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">Sarah M.</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Great value for money. Would recommend to others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
