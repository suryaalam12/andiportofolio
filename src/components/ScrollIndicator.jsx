import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import rocketAnimation from '../assets/rocket mate.json';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('down'); // 'up' or 'down'
    const rafRef = useRef(null);
    const scrollTimeout = useRef(null);
    const lastScrollTop = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            // Cancel previous animation frame
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            // Use requestAnimationFrame for smooth updates
            rafRef.current = requestAnimationFrame(() => {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Calculate scroll percentage (0 to 100)
                const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
                setScrollProgress(Math.min(100, Math.max(0, scrollPercentage)));

                // Detect scroll direction
                // console.log('Scroll:', scrollTop, 'Last:', lastScrollTop.current, 'Direction:', scrollDirection);

                // Detect scroll direction
                // console.log('Scroll:', scrollTop, 'Last:', lastScrollTop.current, 'Direction:', scrollDirection);

                if (scrollTop > lastScrollTop.current) {
                    // console.log('Setting direction DOWN');
                    setScrollDirection('down'); // Scrolling down - rocket points up
                } else if (scrollTop < lastScrollTop.current) {
                    // console.log('Setting direction UP');
                    setScrollDirection('up'); // Scrolling up - rocket points down
                }
                lastScrollTop.current = scrollTop;

                // Clear existing timeout
                if (scrollTimeout.current) {
                    clearTimeout(scrollTimeout.current);
                }

                // Set new timeout to check for bottom of page after scrolling stops
                scrollTimeout.current = setTimeout(() => {
                    if (scrollPercentage > 99) {
                        setScrollDirection('up');
                    }
                }, 150);
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, []);

    return (
        <div className="scroll-indicator">
            <div className="scroll-track">
                <div
                    className={`scroll-rocket ${scrollDirection === 'up' ? 'rocket-up' : 'rocket-down'}`}
                    style={{
                        top: `${scrollProgress}%`,
                        transform: `translate(-50%, -50%) rotate(${scrollDirection === 'up' ? 0 : 180}deg)`
                    }}
                >
                    <Lottie
                        animationData={rocketAnimation}
                        loop={true}
                        autoplay={true}
                        style={{ width: '100px', height: '100px' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ScrollIndicator;
