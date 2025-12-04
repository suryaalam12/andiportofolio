import React from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import "./Header.css";
import Lottie from "lottie-react";
import meteorAnimation from "../assets/Falling Meteor.json";

const Header = () => {
  const { profile } = useGlobalContext();

  return (
    <header className="header">
      {/* Falling Meteor Background */}
      <div className="meteor-background">
        <Lottie
          animationData={meteorAnimation}
          loop={true}
          autoplay={true}
          speed={0.1}
        />
      </div>

      <div className="container">
        <div className="header-content">
          <div className="name-container">
            <div className="hi-animation">
            </div>
            <h1 className="profile-name">{profile.name}</h1>
          </div>
          <h2 className="profile-title">{profile.title}</h2>
          <div className="profile-location">
            <i className="fas fa-map-marker-alt"></i>
            <span>{profile.location}</span>
          </div>

          {/* Navigation Menu */}
          <nav className="header-nav">
            <a href="#about" className="nav-link">About</a>
            <a href="#activities" className="nav-link">Activities</a>
            <a href="#projects" className="nav-link">Projects</a>
          </nav>

          <div className="header-cta">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
