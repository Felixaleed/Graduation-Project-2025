import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/FeatureCards.css";

const features = [
  { image: "/images/chatbot (2).png", title: "chatbot", path: "/chatbot" },
  { image: "/images/geneticc.png", title: "genetic history", path: "/genetic-history" },
  { image: "/images/severityy.png", title: "psoriasis severity", path: "/psoriasis-severity" },
  { image: "/images/classification.png", title: "Classify skin Disease", path: "/classification" },
  { image: "/images/tips.png", title: "Tips", path: "/tips" },
  { image: "/images/doctors.jpg", title: "Doctors", path: "/doctors" },
];

const FeatureCards = () => {
  const navigate = useNavigate(); // Initialize navigation hook

  const handleCardClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <section className="feature-cards">
      {features.map((feature, index) => (
        <div
          className="card"
          key={index}
          onClick={() => handleCardClick(feature.path)} // Handle click
          style={{ cursor: "pointer" }} // Add a pointer cursor
        >
          <img src={feature.image} alt={feature.title} />
          <h3>{feature.title}</h3>
        </div>
      ))}
    </section>
  );
};

export default FeatureCards;
