import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
          <img src="/images/logo.png" alt="psorai logo" />
      </div>
      <ul className="navbar-menu">
        <li><a href="#home" className="active">Home</a></li>
        <li><a href="#company">sign in</a></li>
        <li><a href="#products">chatbot</a></li>
        <li><a href="#education">doctors</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>
    </nav>
  );
};

export default Navbar;
