import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import "./Activities.css";

const Activities = () => {
    const { activities } = useGlobalContext();
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const openLightbox = (activity) => {
        setSelectedActivity(activity);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setSelectedActivity(null);
        document.body.style.overflow = 'auto';
    };

    // Close lightbox on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && lightboxOpen) {
                closeLightbox();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [lightboxOpen]);

    return (
        <section className="section activities-section" id="activities">
            <div className="container">
                <h2 className="section-title">Work Activities</h2>
                <p className="activities-subtitle">
                    Daily highlights from my work at Bapenda Jombang
                </p>

                <div className="activities-grid">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="activity-card"
                            onClick={() => openLightbox(activity)}
                        >
                            <div className="activity-image-wrapper">
                                <img
                                    src={activity.image}
                                    alt={activity.caption}
                                    className="activity-image"
                                    loading="lazy"
                                />
                                <div className="activity-overlay">
                                    <div className="activity-info">
                                        <p className="activity-caption">{activity.caption}</p>
                                        <p className="activity-date">{activity.date}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="activity-tags">
                                {activity.tags.map((tag, index) => (
                                    <span key={index} className="activity-tag">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && selectedActivity && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className="lightbox-image-wrapper">
                            <img
                                src={selectedActivity.image}
                                alt={selectedActivity.caption}
                                className="lightbox-image"
                            />
                        </div>
                        <div className="lightbox-details">
                            <p className="lightbox-caption">{selectedActivity.caption}</p>
                            <p className="lightbox-date">{selectedActivity.date}</p>
                            <div className="lightbox-tags">
                                {selectedActivity.tags.map((tag, index) => (
                                    <span key={index} className="lightbox-tag">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            {selectedActivity.instagramUrl && (
                                <a
                                    href={selectedActivity.instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="instagram-button"
                                >
                                    <i className="fab fa-instagram"></i>
                                    View on Instagram
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Activities;
