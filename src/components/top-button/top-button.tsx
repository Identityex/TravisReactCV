import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './top-button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faRocket } from '@fortawesome/free-solid-svg-icons';

export function TopButton() {
  const [showButton, setShowButton] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setProgress(scrollPercent);
      setShowButton(scrollTop > 300);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: -180,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  const progressVariants = {
    initial: { strokeDashoffset: 283 },
    animate: {
      strokeDashoffset: 283 - (283 * progress) / 100,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          className={styles.topButton}
          onClick={handleClick}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          aria-label={`Scroll to top. ${Math.round(progress)}% of page viewed`}
          title="Scroll to top"
        >
          <svg className={styles.progressRing} width="60" height="60">
            <motion.circle
              cx="30"
              cy="30"
              r="28"
              fill="none"
              stroke="rgba(102, 126, 234, 0.3)"
              strokeWidth="4"
            />
            <motion.circle
              cx="30"
              cy="30"
              r="28"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeDasharray="283"
              variants={progressVariants}
              initial="initial"
              animate="animate"
              transform="rotate(-90 30 30)"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon 
              icon={isHovered ? faRocket : faArrowUp} 
              className={styles.icon}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
