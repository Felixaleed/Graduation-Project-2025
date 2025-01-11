import React from 'react';
import '../styles/TreatmentsSection.css';

const Treatments = () => {
  return (
    <section className="treatments-section">
      <h2>Our Most Popular Acne Treatments</h2>
      <div className="treatments-content">
        <ul>
          <li>Prescription and Laser Options</li>
          <li>Peels</li>
          <li>Microdermabrasion</li>
          <li>LED Light Therapy</li>
          <li>Chemical Peels</li>
        </ul>
        <div className="treatments-image">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Skincare"
          />
        </div>
      </div>
    </section>
  );
};

export default Treatments;
