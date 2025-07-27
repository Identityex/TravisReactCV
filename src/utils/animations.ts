import { Variants } from 'framer-motion';

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Slide animations
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Spring animations
export const springIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { type: 'spring', stiffness: 300 }
};

export const hoverGlow = {
  boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)',
  transition: { duration: 0.3 }
};

// Page transition
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

// Utility function to create custom delays
export const createDelayedAnimation = (baseAnimation: Variants, delay: number): Variants => {
  return {
    hidden: baseAnimation.hidden,
    visible: {
      ...baseAnimation.visible,
      transition: {
        ...((baseAnimation.visible as any).transition || {}),
        delay
      }
    }
  };
};

// Glassmorphism entrance animation
export const glassmorphismIn: Variants = {
  hidden: { 
    opacity: 0, 
    backdropFilter: 'blur(0px)',
    background: 'rgba(255, 255, 255, 0)'
  },
  visible: { 
    opacity: 1, 
    backdropFilter: 'blur(16px)',
    background: 'rgba(255, 255, 255, 0.05)',
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};