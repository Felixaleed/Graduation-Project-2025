import React, { useState } from "react";
import "./ClassificationPage.css"; // Add styling for the page

const ClassificationPage = () => {
  const [image, setImage] = useState(null); // Store the uploaded image
  const [result, setResult] = useState(null); // Store classification result
  const [loading, setLoading] = useState(false); // Show loading spinner

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setResult(null); // Clear previous result
    }
  };

  // Handle form submission to send image to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://localhost:5000/classify", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data); // Store result from backend
      setLoading(false);
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert("Something went wrong. Please try again!");
      setLoading(false);
    }
  };

  return (
    <div className="classification-page">
      <h1>Skin Disease Classification</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <label htmlFor="file-input" className="upload-button">
          {image ? "Change Image" : "Upload Image"}
        </label>
        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {image && (
          <div className="preview">
            <img src={URL.createObjectURL(image)} alt="Preview" />
          </div>
        )}
        <button type="submit" className="submit-button">
          {loading ? "Classifying..." : "Classify"}
        </button>
      </form>

      {result && (
        <div className="result">
          <h2>Classification Result</h2>
          <p>{result.label}</p>
          <p>Confidence: {result.confidence}%</p>
        </div>
      )}
    </div>
  );
};

export default ClassificationPage;
