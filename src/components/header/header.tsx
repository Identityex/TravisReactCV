import styles from './header.module.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.95)'],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#MyInfo', label: 'About' },
    { href: '#Skills', label: 'Skills' },
    { href: '#Projects', label: 'Projects' },
    { href: '#Experiences', label: 'Experience' },
    { href: '#Contact', label: 'Contact' },
  ];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = 80;
      const elementTop = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      style={{ background: headerBackground }}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className={styles.container}>
        <motion.div className={styles.logo} variants={itemVariants}>
          <h1 className={styles.logoText}>TA</h1>
        </motion.div>

        <motion.nav className={styles.desktopNav} variants={navVariants} aria-label="Main navigation">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleNavClick(e, item.href)}
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.label}
            </motion.a>
          ))}
        </motion.nav>

        <motion.button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </motion.button>
      </div>

      <motion.nav
        className={styles.mobileNav}
        variants={mobileMenuVariants}
        initial="closed"
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        {navItems.map((item, index) => (
          <motion.a
            key={item.href}
            href={item.href}
            className={styles.mobileNavLink}
            onClick={(e) => handleNavClick(e, item.href)}
            initial={{ opacity: 0, x: 50 }}
            animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: index * 0.1 }}
          >
            {item.label}
          </motion.a>
        ))}
      </motion.nav>
    </motion.header>
  );
}
