import React from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

const Contact = () => {
  const { state } = useGlobalContext();
  const { profile } = state;

  return (
    <section className="contact">
      <div className="container">
        <h2 className="section-title">Summary</h2>
        <div className="contact-content">
          <p className="summary-text">
            {profile.summary}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
