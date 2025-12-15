import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useGlobalContext } from "../context/GlobalProvider";
import SolarSystem from "./SolarSystem";
import "./Projects.css";

const MobileProject = ({ project }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const carouselRef = useRef(null);
    const cardRef = useRef(null);
    const itemRefs = useRef([]);
    const isCardInView = useInView(cardRef, { once: true, amount: 0.3 });

    const handleScroll = () => {
        if (carouselRef.current) {
            const container = carouselRef.current;
            const containerCenter = container.scrollLeft + container.clientWidth / 2;

            let closestIndex = 0;
            let minDistance = Infinity;

            itemRefs.current.forEach((item, index) => {
                if (item) {
                    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                    const distance = Math.abs(containerCenter - itemCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = index;
                    }
                }
            });

            if (closestIndex !== activeImageIndex) {
                setActiveImageIndex(closestIndex);
            }
        }
    };

    return (
        <motion.article
            className="project-card mobile-card"
            ref={cardRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isCardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <motion.div
                className="project-content"
                initial={{ opacity: 0 }}
                animate={isCardInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h3 className="project-title">{project.title}</h3>

                <div className="project-tech-stack">
                    {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-badge">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="description-container">
                    <p className="project-description dynamic-description fade-in-text" key={activeImageIndex}>
                        {project.imageDescriptions?.[activeImageIndex] || project.description}
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="project-images mobile-layout"
                initial={{ opacity: 0, y: 20 }}
                animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <div
                    className="mobile-carousel"
                    ref={carouselRef}
                    onScroll={handleScroll}
                >
                    {project.images.map((image, index) => (
                        <div
                            key={index}
                            className={`mobile-carousel-item ${index === activeImageIndex ? "active" : ""}`}
                            ref={(el) => (itemRefs.current[index] = el)}
                            onClick={() => {
                                setActiveImageIndex(index);
                                itemRefs.current[index]?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "nearest",
                                    inline: "center",
                                });
                            }}
                        >
                            <div className="phone-frame">
                                <div className="phone-notch"></div>
                                <div className="phone-screen-static">
                                    <img
                                        src={image}
                                        alt={`${project.title} screen ${index + 1}`}
                                        className="mobile-image"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dot Indicators */}
                <div className="carousel-dots mobile-dots">
                    {project.images.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === activeImageIndex ? "active" : ""}`}
                            onClick={() => {
                                setActiveImageIndex(index);
                                itemRefs.current[index]?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "nearest",
                                    inline: "center",
                                });
                            }}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.article>
    );
};


const WebmapProject = ({ project }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const carouselRef = useRef(null);
    const cardRef = useRef(null);
    const itemRefs = useRef([]);
    const isCardInView = useInView(cardRef, { once: true, amount: 0.3 });

    const handleScroll = () => {
        if (carouselRef.current) {
            const container = carouselRef.current;
            const containerCenter = container.scrollLeft + container.clientWidth / 2;

            let closestIndex = 0;
            let minDistance = Infinity;

            itemRefs.current.forEach((item, index) => {
                if (item) {
                    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                    const distance = Math.abs(containerCenter - itemCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = index;
                    }
                }
            });

            if (closestIndex !== activeImageIndex) {
                setActiveImageIndex(closestIndex);
            }
        }
    };

    return (
        <motion.article
            className="project-card webmap-card"
            ref={cardRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isCardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <motion.div
                className="project-content"
                initial={{ opacity: 0 }}
                animate={isCardInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h3 className="project-title">{project.title}</h3>

                <div className="project-tech-stack">
                    {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-badge">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="description-container">
                    <p className="project-description dynamic-description fade-in-text" key={activeImageIndex}>
                        {project.imageDescriptions?.[activeImageIndex] || project.description}
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="project-images webmap-layout"
                initial={{ opacity: 0, y: 20 }}
                animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <div
                    className="webmap-carousel"
                    ref={carouselRef}
                    onScroll={handleScroll}
                >
                    {project.images.map((image, index) => (
                        <div
                            key={index}
                            className={`webmap-carousel-item ${index === activeImageIndex ? "active" : ""}`}
                            ref={(el) => (itemRefs.current[index] = el)}
                            onClick={() => {
                                setActiveImageIndex(index);
                                itemRefs.current[index]?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "nearest",
                                    inline: "center",
                                });
                            }}
                        >
                            <div className="browser-frame">
                                <div className="browser-header">
                                    <div className="browser-dots">
                                        <span className="dot-btn red"></span>
                                        <span className="dot-btn yellow"></span>
                                        <span className="dot-btn green"></span>
                                    </div>
                                    <div className="browser-url-bar">
                                        <span className="url-text">{project.title}</span>
                                    </div>
                                </div>
                                <div className="browser-screen">
                                    <img
                                        src={image}
                                        alt={`${project.title} screen ${index + 1}`}
                                        className="webmap-image"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dot Indicators */}
                {project.images.length > 1 && (
                    <div className="carousel-dots webmap-dots">
                        {project.images.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === activeImageIndex ? "active" : ""}`}
                                onClick={() => {
                                    setActiveImageIndex(index);
                                    itemRefs.current[index]?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "nearest",
                                        inline: "center",
                                    });
                                }}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.article>
    );
};

const Projects = ({ isReady = true }) => {
    const { projects } = useGlobalContext();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section className="section projects-section" id="projects" ref={sectionRef}>
            {/* Fixed Solar System Background */}
            <SolarSystem isReady={isReady} />

            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                    Featured Projects
                </motion.h2>

                <div className="projects-list">
                    {projects.map((project) => {
                        const ProjectComponent = project.category === "mobile" ? MobileProject : WebmapProject;

                        return <ProjectComponent key={project.id} project={project} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
