import React from "react";
import { useGlobalContext } from "../context/GlobalProvider";

const Footer = () => {
    const { profile } = useGlobalContext();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <h2>Let's Work Together</h2>
                    <p>
                        Have a project in mind? Let's build something amazing together.
                    </p>

                    <div className="footer-links">
                        <a
                            href={`mailto:${profile.contact.email}`}
                            className="footer-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Email
                        </a>
                        <a
                            href={profile.contact.linkedin}
                            className="footer-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                        <a
                            href={profile.contact.github}
                            className="footer-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                        <a
                            href={`https://wa.me/${profile.contact.whatsapp.replace(/\+/g, "")}`}
                            className="footer-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp
                        </a>
                    </div>

                    <div className="copyright">
                        <p>
                            © {new Date().getFullYear()} {profile.name}. Built with React
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
