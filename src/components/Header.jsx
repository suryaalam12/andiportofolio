import React from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

const Header = () => {
  const { state } = useGlobalContext();
  const { profile } = state;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="profile-section">
            <div className="profile-info">
              <h1 className="profile-name">{profile.name}</h1>
              <h2 className="profile-title">{profile.title}</h2>
              <p className="profile-location">{profile.location}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
