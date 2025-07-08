import React, { useState } from 'react';
import { Pill as Pills, Calendar, Clock, MapPin, Phone, Shield, Award, Users } from 'lucide-react';

const Pharmacy = () => {
  const [selectedService, setSelectedService] = useState('prescriptions');

  const services = [
    { id: 'prescriptions', label: 'Prescriptions', icon: Pills },
    { id: 'health-screening', label: 'Health Screening', icon: Shield },
    { id: 'immunizations', label: 'Immunizations', icon: Award },
    { id: 'consultations', label: 'Consultations', icon: Users },
  ];

  const renderServiceContent = () => {
    switch (selectedService) {
      case 'prescriptions':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Transfer Prescription</h3>
                <p className="text-blue-700 mb-4">
                  Transfer your prescription from another pharmacy easily
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Transfer
                </button>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Refill Prescription</h3>
                <p className="text-green-700 mb-4">
                  Refill your existing prescription quickly
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Refill Now
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescription Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Fast Service</h4>
                  <p className="text-sm text-gray-600">Most prescriptions ready in 30 minutes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Low Prices</h4>
                  <p className="text-sm text-gray-600">Everyday low prices on medications</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Expert Care</h4>
                  <p className="text-sm text-gray-600">Licensed pharmacists available</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'health-screening':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Health Screenings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Blood Pressure Check</h4>
                  <p className="text-sm text-gray-600 mb-3">Quick and accurate blood pressure monitoring</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">FREE</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Cholesterol Screening</h4>
                  <p className="text-sm text-gray-600 mb-3">Comprehensive cholesterol level testing</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$29.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Diabetes Screening</h4>
                  <p className="text-sm text-gray-600 mb-3">Blood glucose level testing</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$19.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">BMI Assessment</h4>
                  <p className="text-sm text-gray-600 mb-3">Body mass index calculation and consultation</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">FREE</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'immunizations':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Immunizations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Flu Shot</h4>
                  <p className="text-sm text-gray-600 mb-3">Annual influenza vaccination</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$39.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">COVID-19 Vaccine</h4>
                  <p className="text-sm text-gray-600 mb-3">Updated COVID-19 vaccination</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">FREE</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Shingles Vaccine</h4>
                  <p className="text-sm text-gray-600 mb-3">Shingles prevention for adults 50+</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$199.99</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Pneumonia Vaccine</h4>
                  <p className="text-sm text-gray-600 mb-3">Pneumococcal vaccination</p>
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
      case 'consultations':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pharmacist Consultations</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Medication Review</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Comprehensive review of your medications to check for interactions and optimize therapy
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">FREE</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Medication Counseling</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Learn about your medications, side effects, and proper usage
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">FREE</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Health & Wellness Consultation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Discuss your health goals and get personalized recommendations
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">$29.99</span>
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
            <h1 className="text-4xl font-bold mb-4">Walmart Pharmacy</h1>
            <p className="text-xl text-blue-100 mb-8">
              Your health is our priority. Get prescriptions, immunizations, and health services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Find a Pharmacy
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Schedule Appointment
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
                <p className="text-gray-600">Mon-Fri: 9AM-9PM</p>
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Walmart Pharmacy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pills className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">$4 Generics</h3>
              <p className="text-gray-600">Over 300 generic medications for just $4</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Service</h3>
              <p className="text-gray-600">Most prescriptions ready in 30 minutes or less</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Care</h3>
              <p className="text-gray-600">Licensed pharmacists available for consultations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Insurance Accepted</h3>
              <p className="text-gray-600">We accept most insurance plans</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pharmacy;