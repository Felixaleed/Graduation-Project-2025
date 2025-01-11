import React, { useState } from "react";
import "./SeverityPage.css";

const SeverityPage = () => {
  const [step, setStep] = useState(1); // Track current step
  const [data, setData] = useState({
    head: { erythema: 0, induration: 0, scaling: 0, area: 0 },
    arms: { erythema: 0, induration: 0, scaling: 0, area: 0 },
    trunk: { erythema: 0, induration: 0, scaling: 0, area: 0 },
    legs: { erythema: 0, induration: 0, scaling: 0, area: 0 },
  });
  const [pasiScore, setPasiScore] = useState(null); // Store final PASI score

  // Handle input change
  const handleChange = (region, field, value) => {
    setData({
      ...data,
      [region]: {
        ...data[region],
        [field]: parseFloat(value),
      },
    });
  };

  // Calculate PASI Score
  const calculatePasi = () => {
    const weights = { head: 0.1, arms: 0.2, trunk: 0.3, legs: 0.4 };
    let score = 0;

    Object.keys(data).forEach((region) => {
      const { erythema, induration, scaling, area } = data[region];
      const severity = erythema + induration + scaling;
      score += weights[region] * severity * (area / 6);
    });

    setPasiScore(score.toFixed(2)); // Set the final PASI score (rounded to 2 decimals)
  };

  // Render inputs for each region
  const renderRegionForm = (region) => (
    <div className="form-container">
      <h2>{region.charAt(0).toUpperCase() + region.slice(1)}</h2>
      <label>
        Erythema (0-4):
        <input
          type="number"
          min="0"
          max="4"
          value={data[region].erythema}
          onChange={(e) => handleChange(region, "erythema", e.target.value)}
        />
      </label>
      <label>
        Induration (0-4):
        <input
          type="number"
          min="0"
          max="4"
          value={data[region].induration}
          onChange={(e) => handleChange(region, "induration", e.target.value)}
        />
      </label>
      <label>
        Scaling (0-4):
        <input
          type="number"
          min="0"
          max="4"
          value={data[region].scaling}
          onChange={(e) => handleChange(region, "scaling", e.target.value)}
        />
      </label>
      <label>
        Area % (0-100):
        <input
          type="number"
          min="0"
          max="100"
          value={data[region].area}
          onChange={(e) => handleChange(region, "area", e.target.value)}
        />
      </label>
    </div>
  );

  // Handle navigation between steps
  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else calculatePasi(); // Calculate PASI at the last step
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="severity-page">
      <h1>PASI Calculator</h1>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>
      {step === 1 && renderRegionForm("head")}
      {step === 2 && renderRegionForm("arms")}
      {step === 3 && renderRegionForm("trunk")}
      {step === 4 && renderRegionForm("legs")}
      {pasiScore !== null && (
        <div className="result">
          <h2>Your PASI Score: <span>{pasiScore}</span></h2>
        </div>
      )}
      <div className="button-group">
        {step > 1 && step <= 4 && (
          <button onClick={prevStep} className="prev-btn">
            Previous
          </button>
        )}
        {step <= 4 && (
          <button onClick={nextStep} className="next-btn">
            {step < 4 ? "Next" : "Calculate"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SeverityPage;
