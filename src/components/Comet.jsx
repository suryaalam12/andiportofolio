import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Comet = () => {
    // Generate orbital parameters that stay consistent during session
    const orbitParams = useMemo(() => ({
        orbitRadius: 900, // Distance from center (sun)
        eccentricity: 0.6, // Elliptical orbit (0 = circle, 1 = line)
        tiltAngle: Math.random() * 45, // Orbital plane tilt
        speed: 25, // Duration in seconds for full orbit
    }), []);

    // SVG path for elliptical orbit visualization
    const generateEllipsePath = () => {
        const rx = orbitParams.orbitRadius;
        const ry = orbitParams.orbitRadius * (1 - orbitParams.eccentricity);
        return `M ${rx} 0 A ${rx} ${ry} 0 1 1 -${rx} 0 A ${rx} ${ry} 0 1 1 ${rx} 0`;
    };

    // Generate fire particles
    const fireParticles = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            id: i,
            offset: Math.random() * 30 + 20,
            delay: i * 0.05,
            duration: 1.2 + Math.random() * 0.5
        }));
    }, []);

    return (
        <motion.div
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 1
            }}
        >
            {/* Orbital path (optional visual) */}
            <svg
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    opacity: 0.15
                }}
                viewBox="-1500 -1500 3000 3000"
            >
                <path
                    d={generateEllipsePath()}
                    fill="none"
                    stroke="rgba(255, 222, 89, 0.5)"
                    strokeWidth="2"
                    strokeDasharray="10,5"
                />
            </svg>

            {/* Comet orbiting element */}
            <motion.svg
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    overflow: 'visible',
                    filter: 'drop-shadow(0 0 50px rgba(255, 100, 0, 0.8))'
                }}
                viewBox="-1500 -1500 3000 3000"
                animate={{
                    rotateZ: 360
                }}
                transition={{
                    duration: orbitParams.speed,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            >
                {/* Gradients and Filters */}
                <defs>
                    {/* Main fire gradient */}
                    <linearGradient id="fireGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255, 240, 100, 1)" stopOpacity="1" />
                        <stop offset="15%" stopColor="rgba(255, 180, 50, 1)" stopOpacity="0.95" />
                        <stop offset="35%" stopColor="rgba(255, 100, 20, 0.9)" stopOpacity="0.8" />
                        <stop offset="55%" stopColor="rgba(200, 50, 0, 0.7)" stopOpacity="0.6" />
                        <stop offset="75%" stopColor="rgba(150, 20, 0, 0.4)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgba(100, 0, 0, 0)" stopOpacity="0" />
                    </linearGradient>

                    {/* Secondary fire glow */}
                    <linearGradient id="fireGradient2" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255, 200, 80, 0.9)" stopOpacity="0.9" />
                        <stop offset="30%" stopColor="rgba(255, 80, 0, 0.7)" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="rgba(100, 0, 0, 0)" stopOpacity="0" />
                    </linearGradient>

                    {/* Blur filter */}
                    <filter id="fireBlur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                    </filter>

                    {/* Intense glow filter */}
                    <filter id="intenseGlow">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.8" />
                        </feComponentTransfer>
                    </filter>
                </defs>

                {/* Comet group */}
                <g>
                    {/* Large outer flame glow */}
                    <ellipse
                        cx="800"
                        cy="0"
                        rx="300"
                        ry="120"
                        fill="url(#fireGradient2)"
                        opacity="0.4"
                        filter="url(#intenseGlow)"
                    />

                    {/* Main fire tail - thick and dramatic */}
                    <path
                        d="M 860 0 Q 600 -90 250 -150 L 250 150 Q 600 90 860 0"
                        fill="url(#fireGradient)"
                        opacity="0.95"
                    />

                    {/* Secondary fire layers for depth */}
                    <path
                        d="M 860 0 Q 650 -70 300 -120 L 300 120 Q 650 70 860 0"
                        fill="url(#fireGradient)"
                        opacity="0.75"
                    />

                    <path
                        d="M 860 0 Q 700 -50 350 -90 L 350 90 Q 700 50 860 0"
                        fill="url(#fireGradient)"
                        opacity="0.55"
                    />

                    {/* Flickering fire edges */}
                    <motion.path
                        d="M 860 0 Q 580 -100 200 -160 L 200 160 Q 580 100 860 0"
                        fill="none"
                        stroke="rgba(255, 150, 0, 0.6)"
                        strokeWidth="8"
                        animate={{
                            opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />

                    {/* Dynamic fire particles */}
                    {fireParticles.map((particle) => (
                        <motion.circle
                            key={`fire-${particle.id}`}
                            cx="900"
                            cy="0"
                            r={Math.random() * 8 + 3}
                            fill={
                                particle.id % 3 === 0
                                    ? 'rgba(255, 220, 100, 0.8)'
                                    : particle.id % 3 === 1
                                    ? 'rgba(255, 150, 0, 0.7)'
                                    : 'rgba(200, 50, 0, 0.6)'
                            }
                            animate={{
                                x: [0, -(200 + Math.random() * 100)],
                                y: [0, (Math.random() - 0.5) * 150],
                                opacity: [1, 0]
                            }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                delay: particle.delay,
                                ease: 'easeOut'
                            }}
                        />
                    ))}

                    {/* Core head - bright white/yellow */}
                    <circle
                        cx="900"
                        cy="0"
                        r="18"
                        fill="rgba(255, 255, 200, 0.95)"
                    />

                    {/* Head inner glow */}
                    <circle
                        cx="900"
                        cy="0"
                        r="16"
                        fill="rgba(255, 240, 100, 0.8)"
                    />

                    {/* Head bright core */}
                    <circle
                        cx="900"
                        cy="0"
                        r="10"
                        fill="rgba(255, 255, 255, 0.9)"
                    />

                    {/* Pulsing aura around head */}
                    <motion.circle
                        cx="900"
                        cy="0"
                        r="30"
                        fill="none"
                        stroke="rgba(255, 150, 0, 0.8)"
                        strokeWidth="2"
                        animate={{
                            r: [30, 50, 30],
                            opacity: [0.8, 0.2, 0.8]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />

                    {/* Outer intense glow */}
                    <motion.circle
                        cx="900"
                        cy="0"
                        r="60"
                        fill="none"
                        stroke="rgba(255, 100, 0, 0.4)"
                        strokeWidth="4"
                        animate={{
                            r: [60, 90, 60],
                            opacity: [0.5, 0.1, 0.5]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                </g>
            </motion.svg>
        </motion.div>
    );
};

export default Comet;
