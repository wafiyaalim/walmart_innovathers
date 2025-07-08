import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Package } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';

const Checkout = () => {
  const { state: cartState, dispatch } = useCart();
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handlePlaceOrder = () => {
    // Simulate order processing
    setOrderComplete(true);
    dispatch({ type: 'CLEAR_CART' });
    
    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cartState.items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="font-mono text-lg">#WM{Date.now().toString().slice(-8)}</p>
          </div>
          <p className="text-sm text-gray-600">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    <User className="w-4 h-4" />
                  </div>
                  <span className={step >= 1 ? 'text-blue-600' : 'text-gray-400'}>
                    Shipping
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className={step >= 2 ? 'text-blue-600' : 'text-gray-400'}>
                    Payment
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    <Package className="w-4 h-4" />
                  </div>
                  <span className={step >= 3 ? 'text-blue-600' : 'text-gray-400'}>
                    Review
                  </span>
                </div>
              </div>
            </div>

            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={paymentInfo.nameOnCard}
                    onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back to Shipping
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                    <p className="text-gray-600">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                    <p className="text-gray-600">
                      **** **** **** {paymentInfo.cardNumber.slice(-4)}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back to Payment
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md h-fit">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {cartState.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartState.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(cartState.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${(cartState.total * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;