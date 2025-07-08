import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-yellow-300">Help Center</Link></li>
              <li><Link to="#" className="hover:text-yellow-300">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-yellow-300">Track Your Order</Link></li>
              <li><Link to="#" className="hover:text-yellow-300">Return Policy</Link></li>
              <li><Link to="#" className="hover:text-yellow-300">Shipping Information</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products/grocery" className="hover:text-yellow-300">Grocery</Link></li>
              <li><Link to="/products/electronics" className="hover:text-yellow-300">Electronics</Link></li>
              <li><Link to="/products/clothing" className="hover:text-yellow-300">Clothing</Link></li>
              <li><Link to="/products/home" className="hover:text-yellow-300">Home & Garden</Link></li>
              <li><Link to="/pharmacy" className="hover:text-yellow-300">Pharmacy</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-yellow-300">About Us</Link></li>
              <li><Link to="#" className="hover:text-yellow-300">Careers</Link></li>
              <li><Link to="#" className="hover:text-yellow-300">Press Room</Link></li>
              <li><Link to="#" className="hover:text-yellow-300">Investor Relations</Link></li>
              <li><Link to="#" className="hover:text-yellow-300">Sustainability</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
            <div className="flex space-x-4 mb-4">
              <Facebook className="w-6 h-6 hover:text-yellow-300 cursor-pointer" />
              <Twitter className="w-6 h-6 hover:text-yellow-300 cursor-pointer" />
              <Instagram className="w-6 h-6 hover:text-yellow-300 cursor-pointer" />
              <Youtube className="w-6 h-6 hover:text-yellow-300 cursor-pointer" />
            </div>
            <p className="text-sm text-gray-300">
              Get the latest news and updates from Walmart
            </p>
          </div>
        </div>

        <div className="border-t border-blue-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 Walmart Inc. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="#" className="hover:text-yellow-300">Privacy Policy</Link>
            <Link to="#" className="hover:text-yellow-300">Terms of Service</Link>
            <Link to="#" className="hover:text-yellow-300">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;