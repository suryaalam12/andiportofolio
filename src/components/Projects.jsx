import React from 'react';
import { useGlobalContext } from '../context/GlobalProvider';

const Projects = () => {
  const { state } = useGlobalContext();
  const { projects } = state;

  return (
    <section className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <p className="project-description">{project.description}</p>

              {project.menu && project.menu.length > 0 && project.menu[0].id !== "no need this" && (
                <div className="key-achievements">
                  <h4 className="achievements-title">Featured Menu:</h4>
                  <div className="achievements-list">
                    {project.menu.map((achievement, index) => (
                      <div key={achievement.id} className="achievement-row">
                        <div className="achievement-content">
                          <h5 className="achievement-label">{achievement.label}</h5>
                          <p className="achievement-description">{achievement.content}</p>
                        </div>
                        <div className="achievement-media">
                          {achievement.videoPath ? (
                            <img
                              src={achievement.videoPath}
                              alt={achievement.label}
                              width="100%"
                              style={{
                                ...(typeof achievement.videoPath === 'string' && achievement.videoPath.includes('p_1') 
                                  ? { maxHeight: "600px", objectFit: "cover" } 
                                  : { maxHeight: "500px", maxWidth: "280px", margin: "0 auto", display: "block" })
                              }}
                              className="achievement-gif"
                            />
                          ) : (
                            <div className="media-placeholder">
                              <p>Media for {achievement.label}</p>
                              <span className="media-icon">🎬</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
