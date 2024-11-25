import React from 'react';

export const Header = () => (
  <div className="bg-gradient-to-r from-[#1a237e] to-[#0d47a1] px-6 py-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src="https://www.humcommerce.com/wp-content/uploads/2022/01/Humcommerce-Logo-1024x440-1-768x330-1.webp"
          alt="HumCommerce Logo"
          className="h-10"
        />
        <h1 className="text-3xl font-bold text-white font-poppins">
          Interview Evaluation Sheet
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-right">
          <p className="text-white text-sm opacity-90">Excellence in</p>
          <p className="text-white font-semibold">Technical Assessment</p>
        </div>
        <div className="w-0.5 h-12 bg-white/20"></div>
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=100&h=100"
          alt="Team"
          className="h-12 w-12 rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
);