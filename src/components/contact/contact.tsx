import { Section } from '../section/Section.tsx';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapPin, faGlobe, faClock } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from './contact.module.css';

export function Contact() {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  return (
        <Section sectionId={'Contact'}>
            <motion.div
                className={styles.contactContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 className={styles.gradientHeading} variants={itemVariants}>
                    Let's Connect
                </motion.h1>
                <motion.p className={styles.subtitle} variants={itemVariants}>
                    Ready to build something amazing together
                </motion.p>

                <motion.div className={styles.contactGrid} variants={containerVariants}>
                    <motion.div className={styles.contactCard} variants={itemVariants}>
                        <div className={styles.iconWrapper}>
                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                        </div>
                        <h3>Email</h3>
                        <a href={'mailto:arsenault.travis@gmail.com'} className={styles.contactLink}>
                            arsenault.travis@gmail.com
                        </a>
                    </motion.div>

                    <motion.div className={styles.contactCard} variants={itemVariants}>
                        <div className={styles.iconWrapper}>
                            <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                        </div>
                        <h3>Phone</h3>
                        <a href={'tel:+18076317682'} className={styles.contactLink}>
                            807-631-7682
                        </a>
                    </motion.div>

                    <motion.div className={styles.contactCard} variants={itemVariants}>
                        <div className={styles.iconWrapper}>
                            <FontAwesomeIcon icon={faMapPin} className={styles.icon} />
                        </div>
                        <h3>Location</h3>
                        <p className={styles.contactText}>Thunder Bay, Ontario</p>
                    </motion.div>

                    <motion.div className={styles.contactCard} variants={itemVariants}>
                        <div className={styles.iconWrapper}>
                            <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
                        </div>
                        <h3>Website</h3>
                        <a href={'https://cv.idxstudios.ca'} className={styles.contactLink} target="_blank" rel="noreferrer">
                            cv.idxstudios.ca
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div className={styles.socialSection} variants={itemVariants}>
                    <h2>Connect on Social</h2>
                    <div className={styles.socialLinks}>
                        <motion.a 
                            href={'https://github.com/identityex'} 
                            target={'_blank'} 
                            rel={'noreferrer'}
                            className={styles.socialLink}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FontAwesomeIcon icon={faGithub} size="2x" />
                        </motion.a>
                        <motion.a 
                            href={'https://www.linkedin.com/in/travis-arsenault-7113bab0/'} 
                            target={'_blank'}
                            rel={'noreferrer'}
                            className={styles.socialLink}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FontAwesomeIcon icon={faLinkedin} size="2x" />
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div className={styles.businessInfo} variants={itemVariants}>
                    <img className={styles.companyLogo} src={'/images/IDXLogo-White.png'} alt={'IDX Studios Canada Ltd.'}/>
                    <p className={styles.companyName}>IDX Studios Canada Ltd.</p>
                    <div className={styles.hours}>
                        <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
                        <span>Monday - Friday: 10:30am - 6:00pm EST</span>
                    </div>
                </motion.div>
            </motion.div>
        </Section>
  );
}
