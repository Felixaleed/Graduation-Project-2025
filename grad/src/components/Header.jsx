import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">derm.ca</h1>
      <nav>
        <ul className="flex space-x-6 text-gray-700">
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Book Appointment</button>
    </header>
  );
};

export default Header;
