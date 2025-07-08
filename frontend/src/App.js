import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import { AuthProvider } from './Context/AuthContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Account from './Pages/Account';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Pharmacy from './Pages/Pharmacy';
import Auto from './Pages/Auto';
import HomeServices from './Pages/HomeService';
import Search from './Pages/Search';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/account" element={<Account />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/pharmacy" element={<Pharmacy />} />
                <Route path="/auto" element={<Auto />} />
                <Route path="/services" element={<HomeServices />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;