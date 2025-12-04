import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './SolarSystem.css';

const SolarSystem = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Add physics-based smoothing to the scroll progress
    const smoothScroll = useSpring(scrollYProgress, {
        mass: 0.5,
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    });

    // Move the entire solar system from Top-Left to Bottom-Right based on scroll
    const x = useTransform(smoothScroll, [0, 1], ["0%", "50%"]); // Moves to center horizontal
    const y = useTransform(smoothScroll, [0, 1], ["0%", "50%"]); // Moves to center vertical

    // Stable configuration for a full-screen solar system
    // speedFactor determines how fast it rotates relative to scroll
    const planets = [
        { size: 15, color: '#FFD700', orbitRadius: 180, speedFactor: 3.5 },  // Mercury-ish (Fastest)
        { size: 22, color: '#4169E1', orbitRadius: 300, speedFactor: 2.8 },  // Earth-ish
        { size: 18, color: '#FF6347', orbitRadius: 450, speedFactor: 2.2 },  // Mars-ish
        { size: 35, color: '#FFA500', orbitRadius: 650, speedFactor: 1.5 },  // Jupiter-ish
        { size: 28, color: '#DEB887', orbitRadius: 850, speedFactor: 1.0 },  // Saturn-ish
        { size: 20, color: '#00CED1', orbitRadius: 1050, speedFactor: 0.7 }, // Uranus-ish
        { size: 16, color: '#9370DB', orbitRadius: 1250, speedFactor: 0.4 }  // Neptune-ish (Slowest)
    ];

    return (
        <motion.div
            className="solar-system-container"
            ref={containerRef}
            style={{ x, y }}
        >
            {/* Ambient Stars Background */}
            <div className="stars-background">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        className="star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: Math.random() * 3 + 1,
                            height: Math.random() * 3 + 1,
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            {/* Central Sun */}
            <motion.div
                className="sun"
                animate={{
                    boxShadow: [
                        "0 0 60px rgba(255, 222, 89, 0.6)",
                        "0 0 100px rgba(255, 222, 89, 0.8)",
                        "0 0 60px rgba(255, 222, 89, 0.6)"
                    ]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Planetary Orbits */}
            {planets.map((planet, index) => {
                // Create a unique rotation transform for each planet based on scroll
                // We map 0-1 scroll progress to 135-(135 + 360 * speed) degrees
                // Starting at 135 degrees places planets at the bottom-right diagonal relative to the top-left sun
                const rotation = useTransform(smoothScroll, [0, 1], [135, 135 + 360 * planet.speedFactor]);

                return (
                    <motion.div
                        key={index}
                        className="orbit-track"
                        style={{
                            width: planet.orbitRadius * 2,
                            height: planet.orbitRadius * 2,
                        }}
                        // Entrance Animation: Expand out from center
                        initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                        animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                        transition={{
                            duration: 1.5,
                            ease: "easeOut",
                            delay: index * 0.1 // Staggered delay for "accumulation" effect
                        }}
                    >
                        <motion.div
                            className="planet-container"
                            style={{
                                width: '100%',
                                height: '100%',
                                rotate: rotation // Bind rotation to scroll
                            }}
                        >
                            <div
                                className="planet"
                                style={{
                                    width: planet.size,
                                    height: planet.size,
                                    backgroundColor: planet.color,
                                    boxShadow: `0 0 15px ${planet.color}80`,
                                    left: '50%',
                                    top: -planet.size / 2 // Position at top of orbit
                                }}
                            />
                        </motion.div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default SolarSystem;
