import React from 'react';
import '../styles/FAQsSection.css';

const FAQs = () => {
  return (
    <section className="faqs-section">
      <h2>Frequently Asked Questions</h2>
      <div>
        <h3>What causes acne?</h3>
        <p>
          Acne occurs due to a combination of factors including genetics, hormonal 
          fluctuations, and environmental influences.
        </p>
      </div>
      <div>
        <h3>How do you treat it?</h3>
        <p>
          Our clinic offers personalized acne treatments ranging from medical-grade
          skincare products to advanced therapies like lasers and peels.
        </p>
      </div>
    </section>
  );
};

export default FAQs;
