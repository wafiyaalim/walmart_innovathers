import React, { useState } from 'react';
import { Car, Wrench, Calendar, Clock, MapPin, Phone, Battery, Fuel, Gauge } from 'lucide-react';

const Auto = () => {
  const [selectedService, setSelectedService] = useState('oil-change');

  const services = [
    { id: 'oil-change', label: 'Oil Change', icon: Fuel },
    { id: 'tires', label: 'Tires', icon: Car },
    { id: 'battery', label: 'Battery', icon: Battery },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  ];

  const renderServiceContent = () => {
    switch (selectedService) {
      case 'oil-change':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Oil Change Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Conventional Oil Change</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Standard oil change with conventional motor oil
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$29.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Full Synthetic Oil Change</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Premium synthetic oil for better engine protection
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$49.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">High Mileage Oil Change</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Specially formulated for vehicles with 75,000+ miles
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$39.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Diesel Oil Change</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Specialized oil change for diesel engines
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$59.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'tires':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tire Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tire Installation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Professional tire mounting and balancing
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$79.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tire Rotation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Rotate tires to ensure even wear
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$19.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tire Balancing</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Balance tires for smooth driving
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$39.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tire Repair</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Patch and repair punctured tires
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$24.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'battery':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Battery Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Battery Installation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Professional battery installation with testing
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$29.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Battery Testing</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Free battery testing and health check
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">FREE</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Jump Start Service</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Emergency jump start assistance
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$19.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Battery Recycling</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Environmentally responsible battery disposal
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">FREE</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'maintenance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Multi-Point Inspection</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Comprehensive 25-point vehicle inspection
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$19.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Brake Service</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Brake inspection and maintenance
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$89.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Air Filter Replacement</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Replace engine and cabin air filters
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$39.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Transmission Service</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Transmission fluid change and inspection
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$149.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Walmart Auto Center</h1>
            <p className="text-xl text-blue-100 mb-8">
              Professional automotive services at everyday low prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Schedule Service
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Find Location
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Location</h3>
                <p className="text-gray-600">123 Main St, Anytown, USA</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">(555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Hours</h3>
                <p className="text-gray-600">Mon-Sat: 7AM-7PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedService === service.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{service.label}</span>
                </button>
              );
            })}
          </div>

          {renderServiceContent()}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Walmart Auto Center?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gauge className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Service</h3>
              <p className="text-gray-600">Most services completed in 30 minutes or less</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Technicians</h3>
              <p className="text-gray-600">Certified technicians with years of experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Parts</h3>
              <p className="text-gray-600">Top-quality parts and fluids for your vehicle</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Convenient Scheduling</h3>
              <p className="text-gray-600">Easy online scheduling and appointment management</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auto;