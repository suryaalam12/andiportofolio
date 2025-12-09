import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AnnotatedScreenshot.css';

const AnnotatedScreenshot = ({ image, annotations = [], title }) => {
    const [activeAnnotation, setActiveAnnotation] = useState(null);

    return (
        <div className="annotated-screenshot">
            {/* Browser Frame */}
            <div className="browser-frame">
                <div className="browser-header">
                    <div className="browser-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <div className="browser-url">
                        <span className="url-icon">🔒</span>
                        <span className="url-text">{title || 'localhost:3000'}</span>
                    </div>
                </div>

                <div className="browser-content">
                    <img
                        src={image}
                        alt={title}
                        className="screenshot-image"
                    />

                    {/* Annotation Markers */}
                    {annotations.map((annotation, index) => (
                        <motion.div
                            key={index}
                            className={`annotation-marker ${activeAnnotation === index ? 'active' : ''}`}
                            style={{
                                left: `${annotation.x}%`,
                                top: `${annotation.y}%`
                            }}
                            onMouseEnter={() => setActiveAnnotation(index)}
                            onMouseLeave={() => setActiveAnnotation(null)}
                            onClick={() => setActiveAnnotation(activeAnnotation === index ? null : index)}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                        >
                            <span className="marker-number">{index + 1}</span>

                            {/* Pulse Effect */}
                            <motion.span
                                className="marker-pulse"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                    ))}

                    {/* Annotation Tooltip */}
                    <AnimatePresence>
                        {activeAnnotation !== null && (
                            <motion.div
                                className="annotation-tooltip"
                                style={{
                                    left: `${annotations[activeAnnotation].x}%`,
                                    top: `${annotations[activeAnnotation].y}%`
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                            >
                                <div className="tooltip-header">
                                    {annotations[activeAnnotation].title}
                                </div>
                                <p className="tooltip-description">
                                    {annotations[activeAnnotation].description}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Feature List Below Screenshot */}
            <div className="feature-list">
                {annotations.map((annotation, index) => (
                    <motion.div
                        key={index}
                        className={`feature-item ${activeAnnotation === index ? 'active' : ''}`}
                        onMouseEnter={() => setActiveAnnotation(index)}
                        onMouseLeave={() => setActiveAnnotation(null)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                    >
                        <span className="feature-number">{index + 1}</span>
                        <div className="feature-content">
                            <h4>{annotation.title}</h4>
                            <p>{annotation.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AnnotatedScreenshot;
