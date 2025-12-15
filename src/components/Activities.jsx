import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "../context/GlobalProvider";
import "./Activities.css";

const Activities = () => {
    const { activities } = useGlobalContext();
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    return (
        <section className="section activities-section" id="activities" ref={sectionRef}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    Work Activities
                </motion.h2>
                <motion.p
                    className="activities-subtitle"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                >
                    Project Implementation
                </motion.p>

                <motion.div
                    className="activities-scroll-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {activities.map((activity) => (
                        <motion.div
                            key={activity.id}
                            className="activity-highlight"
                            onClick={() => openLightbox(activity)}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="highlight-frame-wrapper">
                                <div className="highlight-frame">
                                    <img
                                        src={activity.image}
                                        alt={activity.caption}
                                        className="highlight-image"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <p className="highlight-caption">{activity.caption}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && selectedActivity && (
                <motion.div
                    className="lightbox-overlay"
                    onClick={closeLightbox}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
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
                </motion.div>
            )}
        </section>
    );
};

export default Activities;
