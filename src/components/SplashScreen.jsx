import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../context/GlobalProvider';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
    const { profile } = useGlobalContext();
    const [displayedText, setDisplayedText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    // Typing effect for the full message
    useEffect(() => {
        const text = 'Welcome to my portfolio';
        let index = 0;

        const typingInterval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.substring(0, index + 1));
                index++;
            } else {
                setIsTypingComplete(true);
                clearInterval(typingInterval);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    // Auto dismiss splash screen after 6 seconds (longer display time)
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        },
        exit: {
            y: -200,
            opacity: 0,
            transition: { duration: 1, ease: 'easeInOut' }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
        }
    };

    return (
        <motion.div
            className="splash-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* Animated Background Stars */}
            <div className="splash-stars">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={`splash-star-${i}`}
                        className="splash-star"
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
                            ease: 'easeInOut',
                            delay: Math.random() * 3
                        }}
                    />
                ))}
            </div>

            {/* Gradient Orbs */}
            <motion.div
                className="splash-orb splash-orb-1"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />
            <motion.div
                className="splash-orb splash-orb-2"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            {/* Content */}
            <motion.div
                className="splash-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Welcome Text with Typing Effect */}
                <motion.h1
                    className="splash-welcome"
                    variants={itemVariants}
                >
                    {displayedText}
                    {!isTypingComplete && (
                        <motion.span
                            className="cursor"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                        >
                            |
                        </motion.span>
                    )}
                </motion.h1>

                {/* Subtitle - Let's orbit together with dramatic animation */}
                <motion.div
                    className="splash-orbit-text"
                    variants={itemVariants}
                    style={{
                        animation: 'orbitPulse 2s ease-in-out infinite'
                    }}
                >
                    Let's orbit together
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default SplashScreen;
