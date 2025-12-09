import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useGlobalContext } from '../context/GlobalProvider';
import './About.css';

const About = () => {
  const { state } = useGlobalContext();
  const { profile } = state;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="about" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          About Me
        </motion.h2>

        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p className="about-summary" variants={itemVariants}>
            {profile.summary}
          </motion.p>

          <motion.div className="skills-section" variants={itemVariants}>
            <h3 className="skills-title">Technical Skills</h3>
            <motion.div
              className="skills-grid"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {profile.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="skill-tag"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: '#ffde59',
                    color: '#004aad'
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
