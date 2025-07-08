import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../Components/ProductCard';

const Home = () => {
  const featuredProducts = products.slice(0, 6);
  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/products/electronics'
    },
    {
      name: 'Clothing',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/products/clothing'
    },
    {
      name: 'Home & Garden',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/products/home'
    },
    {
      name: 'Grocery',
      image: 'https://images.pexels.com/photos/1435740/pexels-photo-1435740.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/products/grocery'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Save Money. <br />
                Live Better.
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Discover everyday low prices on everything you need, from groceries to electronics, all in one place.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/products"
                  className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors inline-flex items-center"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/pharmacy"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-colors"
                >
                  Pharmacy
                </Link>
              </div>
            </div>
            <div className="lg:text-right">
              <img
                src="https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Shopping"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Walmart Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/pharmacy"
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center group"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Pharmacy</h3>
              <p className="text-gray-600">Fill prescriptions, get health screenings, and more</p>
            </Link>
            <Link
              to="/auto"
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Auto Center</h3>
              <p className="text-gray-600">Oil changes, tire installation, and automotive services</p>
            </Link>
            <Link
              to="/services"
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center group"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Home Services</h3>
              <p className="text-gray-600">Installation, assembly, and home improvement services</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders $35 or more</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure Shopping</h3>
              <p className="text-sm text-gray-600">Your information is protected</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">90-day return policy</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">We're here to help</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;