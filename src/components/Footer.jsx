import React from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

const Footer = () => {
    const { state } = useGlobalContext();
    const { profile } = state;

    return (
        <footer className="footer">
            <div className="footer-wave"></div>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section footer-main">
                        <h3 className="footer-title">Let's Connect</h3>
                        <p className="footer-subtitle">Ready to discuss your next GIS project?</p>
                        <div className="footer-cta">
                            <a href={`mailto:${profile.contactLinks.email}`} className="cta-button">
                                <i className="fas fa-paper-plane"></i>
                                Get In Touch
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4 className="contact-label">
                            <i className="fas fa-envelope"></i>
                            Email
                        </h4>
                        <a href={`mailto:${profile.contactLinks.email}`} className="footer-link">
                            {profile.contactLinks.email}
                        </a>
                    </div>

                    <div className="footer-section">
                        <h4 className="contact-label">
                            <i className="fab fa-whatsapp"></i>
                            WhatsApp
                        </h4>
                        <a href={`https://wa.me/${profile.contactLinks.whatsapp.replace('+', '')}`} className="footer-link">
                            {profile.contactLinks.whatsapp}
                        </a>
                    </div>

                    <div className="footer-section">
                        <h4 className="contact-label">
                            <i className="fas fa-link"></i>
                            Connect
                        </h4>
                        <div className="social-links">
                            <a href={profile.contactLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
                                <i className="fab fa-github"></i>
                                <span>GitHub</span>
                            </a>
                            <a href={profile.contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                                <i className="fab fa-linkedin"></i>
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <p>&copy; 2025 Make with <i className="fas fa-heart"></i> by <a href="https://github.com/suryaalam12">suryaalam12</a></p>
                    </div>
                    <div className="footer-bottom-right">
                        <p className="footer-location">
                            <i className="fas fa-map-marker-alt"></i>
                            {profile.location}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
