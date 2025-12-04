import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import SolarSystem from "./SolarSystem";
import "./Projects.css";

const MobileProject = ({ project }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0); // Start at first image
    const [isInViewport, setIsInViewport] = useState(false);
    const carouselRef = useRef(null);
    const itemRefs = useRef([]);
    const firstLoad = useRef(true);
    const scrollTimeout = useRef(null);

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
        <article className="project-card mobile-card">
            <div className="project-content">
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
            </div>

            <div className="project-images mobile-layout">
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
            </div>
        </article>
    );
};


const WebmapProject = ({ project }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isInViewport, setIsInViewport] = useState(false);
    const carouselRef = useRef(null);
    const itemRefs = useRef([]);
    const scrollTimeout = useRef(null);

    const handleScroll = () => {
        // Debounce scroll events
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = setTimeout(() => {
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
                    itemRefs.current.forEach((item, i) => {
                        if (item) {
                            if (i === closestIndex) {
                                item.classList.add('active');
                            } else {
                                item.classList.remove('active');
                            }
                        }
                    });
                }
            }
        }, 30); // Reduced to 30ms for faster response
    };

    useEffect(() => {
        // Set first item as active on mount
        if (itemRefs.current[0]) {
            itemRefs.current[0].classList.add('active');
        }
    }, []);

    // Track visibility for keyboard navigation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
            },
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
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = Math.max(0, activeImageIndex - 1);
                setActiveImageIndex(prevIndex);
                itemRefs.current[prevIndex]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = Math.min(project.images.length - 1, activeImageIndex + 1);
                setActiveImageIndex(nextIndex);
                itemRefs.current[nextIndex]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isInViewport, activeImageIndex, project.images.length]);

    return (
        <article className="project-card webmap-card">
            <div className="project-content">
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
                        {project.imageDescriptions && project.imageDescriptions[activeImageIndex]
                            ? project.imageDescriptions[activeImageIndex]
                            : project.description}
                    </p>
                </div>

            </div>

            <div className="project-images netflix-layout">
                <div className="netflix-carousel" ref={carouselRef} onScroll={handleScroll}>
                    {project.images.map((image, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === activeImageIndex ? 'active' : ''}`}
                            ref={(el) => (itemRefs.current[index] = el)}
                            onClick={() => {
                                setActiveImageIndex(index);
                                itemRefs.current[index]?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'nearest',
                                    inline: 'center'
                                });
                            }}
                        >
                            <img
                                src={image}
                                alt={`${project.title} screenshot ${index + 1}`}
                                className="project-image-carousel"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {/* Dot Progress Indicators */}
                <div className="carousel-dots">
                    {project.images.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === activeImageIndex ? 'active' : ''}`}
                            onClick={() => {
                                itemRefs.current[index]?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'nearest',
                                    inline: 'center'
                                });
                            }}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </article>
    );
};

const Projects = () => {
    const { projects } = useGlobalContext();

    return (
        <section className="section projects-section" id="projects">
            {/* Fixed Solar System Background */}
            <SolarSystem />

            <div className="container">
                <h2 className="section-title">Featured Projects</h2>

                <div className="projects-list">
                    {projects.map((project, index) => {
                        const ProjectComponent = project.category === "mobile" ? MobileProject : WebmapProject;

                        return <ProjectComponent key={project.id} project={project} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
