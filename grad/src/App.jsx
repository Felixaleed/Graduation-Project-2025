import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ClassificationPage from "./pages/ClassificationPage";
import SeverityPage from "./pages/SeverityPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/classification" element={<ClassificationPage />} />
        <Route path="/psoriasis-severity" element={<SeverityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
