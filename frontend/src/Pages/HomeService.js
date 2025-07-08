import React, { useState } from 'react';
import { Home, Wrench, Tv, Zap, Hammer, Clock, MapPin, Phone, CheckCircle } from 'lucide-react';

const HomeServices = () => {
  const [selectedService, setSelectedService] = useState('installation');

  const services = [
    { id: 'installation', label: 'Installation', icon: Wrench },
    { id: 'assembly', label: 'Assembly', icon: Hammer },
    { id: 'electronics', label: 'Electronics', icon: Tv },
    { id: 'home-improvement', label: 'Home Improvement', icon: Home },
  ];

  const renderServiceContent = () => {
    switch (selectedService) {
      case 'installation':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">TV Mounting</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Professional TV wall mounting service
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$79.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Ceiling Fan Installation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Install ceiling fans safely and professionally
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$129.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Appliance Installation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Install dishwashers, washers, dryers, and more
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$149.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Smart Home Setup</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Install and configure smart home devices
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$99.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'assembly':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assembly Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Furniture Assembly</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Professional furniture assembly for all brands
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$59.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Desk Assembly</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Assembly of office desks and workstations
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$49.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Bed Assembly</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Assembly of all types of beds and bed frames
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$69.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Exercise Equipment</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Assembly of treadmills, bikes, and home gym equipment
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$99.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'electronics':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Electronics Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Home Theater Setup</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Complete home theater system installation
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$199.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Sound System Installation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Install and configure audio systems
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$149.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Computer Setup</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Setup and configure computers and peripherals
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$79.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">WiFi Network Setup</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Install and configure home WiFi networks
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$89.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'home-improvement':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Home Improvement Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Shelving Installation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Install wall shelves and storage solutions
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$69.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Blind Installation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Install window blinds and curtain rods
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$59.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Mirror Installation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Securely mount mirrors and artwork
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$49.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Door Installation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Install interior and exterior doors
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$179.99</span>
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
            <h1 className="text-4xl font-bold mb-4">Walmart Home Services</h1>
            <p className="text-xl text-blue-100 mb-8">
              Professional installation and assembly services for your home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Schedule Service
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Service</h3>
              <p className="text-gray-600">Select the service you need from our comprehensive list</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Appointment</h3>
              <p className="text-gray-600">Book a convenient time that works for your schedule</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Service</h3>
              <p className="text-gray-600">Our certified technicians complete the job professionally</p>
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

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">All our technicians are licensed and fully insured</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">On-Time Service</h3>
              <p className="text-gray-600">We arrive on time and complete work efficiently</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">All work is guaranteed for your peace of mind</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable Pricing</h3>
              <p className="text-gray-600">Competitive rates with no hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Schedule your service today and let our professionals handle the work
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Schedule Service Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeServices;