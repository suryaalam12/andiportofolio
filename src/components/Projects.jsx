import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useGlobalContext } from "../context/GlobalProvider";
import SolarSystem from "./SolarSystem";
import "./Projects.css";

const MobileProject = ({ project }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0); // Start at first image
    const [isInViewport, setIsInViewport] = useState(false);
    const carouselRef = useRef(null);
    const cardRef = useRef(null);
    const itemRefs = useRef([]);
    const firstLoad = useRef(true);
    const scrollTimeout = useRef(null);
    const isCardInView = useInView(cardRef, { once: true, amount: 0.3 });

    const handleScroll = () => {
        // Debounce scroll events
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = setTimeout(() => {
            // Prevent the first automatic scroll event from resetting to index 0
            if (firstLoad.current) {
                firstLoad.current = false;
                return;
            }

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
        }, 30); // Reduced to 30ms for faster response
    };

    // Set initial active image & scroll to index 0
    useEffect(() => {
        const startIndex = 0; // Changed to 0 - start at first image

        if (itemRefs.current[startIndex]) {
            itemRefs.current[startIndex].classList.add("active");

            // Instant scroll into position
            itemRefs.current[startIndex].scrollIntoView({
                behavior: "auto",
                block: "nearest",
                inline: "center",
            });
        }

        setActiveImageIndex(startIndex);
    }, []);

    // Handle active class on index change
    useEffect(() => {
        itemRefs.current.forEach((item, i) => {
            if (item) {
                if (i === activeImageIndex) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            }
        });
    }, [activeImageIndex]);

    // Track viewport visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInViewport(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Handle container resize - recalculate scroll position
    useEffect(() => {
        if (!carouselRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            // Recenter active item when container resizes
            if (itemRefs.current[activeImageIndex]) {
                itemRefs.current[activeImageIndex].scrollIntoView({
                    behavior: 'auto',
                    block: 'nearest',
                    inline: 'center',
                });
            }
        });

        resizeObserver.observe(carouselRef.current);

        return () => resizeObserver.disconnect();
    }, [activeImageIndex]);

    // Keyboard navigation
    useEffect(() => {
        if (!isInViewport) return;

        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                const prevIndex = Math.max(0, activeImageIndex - 1);
                setActiveImageIndex(prevIndex);
                itemRefs.current[prevIndex]?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                const nextIndex = Math.min(project.images.length - 1, activeImageIndex + 1);
                setActiveImageIndex(nextIndex);
                itemRefs.current[nextIndex]?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isInViewport, activeImageIndex, project.images.length]);

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
                <div className="mobile-carousel" ref={carouselRef} onScroll={handleScroll}>
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
                <div className="webmap-carousel" ref={carouselRef} onScroll={handleScroll}>
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

            {/* Request Demo Button */}
            <motion.div
                className="project-actions"
                initial={{ opacity: 0 }}
                animate={isCardInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <a href="#contact" className="demo-button">
                    Request Demo
                </a>
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
