import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../context/GlobalProvider";
import "./Header.css";
import Lottie from "lottie-react";
import meteorAnimation from "../assets/Falling Meteor.json";

const Header = ({ isReady = true }) => {
  const { profile } = useGlobalContext();

  const headerVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.header
      className="header"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >

      <motion.div className="container" variants={headerVariants} initial="hidden" animate={isReady ? "visible" : "hidden"}>
        <motion.div
          className="header-content"
          initial={{ opacity: 0, y: 40 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        >
          {/* Name with animation */}
          <motion.div
            className="name-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
          >
            <div className="hi-animation"></div>
            <h1 className="profile-name">{profile.name}</h1>
          </motion.div>

          {/* Title with animation */}
          <motion.h2
            className="profile-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
          >
            {profile.title}
          </motion.h2>

          {/* Location with animation */}
          <motion.div
            className="profile-location"
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, delay: 1.3, ease: 'easeOut' }}
          >
            <i className="fas fa-map-marker-alt"></i>
            <span>{profile.location}</span>
          </motion.div>

          {/* Navigation Menu with animation */}
          <motion.nav
            className="header-nav"
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, delay: 1.6, ease: 'easeOut' }}
          >
            <a href="#about" className="nav-link">About</a>
            <a href="#activities" className="nav-link">Activities</a>
            <a href="#projects" className="nav-link">Projects</a>
          </motion.nav>

          {/* CTA Buttons with animation */}
          <motion.div
            className="header-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, delay: 1.9, ease: 'easeOut' }}
          >
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
