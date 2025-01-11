import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';
import Treatments from '../components/Treatments';
import FAQs from '../components/FAQs';
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeatureCards />
      <Footer />
    </div>
  );
};

export default HomePage;
