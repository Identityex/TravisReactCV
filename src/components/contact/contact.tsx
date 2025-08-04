import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Section } from '../section/Section.tsx';
import { ContactForm } from './contact-form.tsx';
import styles from './contact.module.scss';

export function Contact() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
        <div className={styles.backgroundPattern} />
        
        <motion.div className={styles.headerSection} variants={itemVariants}>
          <h1 className={styles.gradientHeading}>
            Let's Create Together
          </h1>
          <p className={styles.subtitle}>
            Transform your ideas into exceptional digital experiences
          </p>
        </motion.div>

        <motion.div className={styles.contactLayout} variants={containerVariants}>
          <motion.div className={`${styles.contactCard} ${styles.primaryCard}`} variants={itemVariants}>
            <div className={styles.cardContent}>
              <ContactForm />
            </div>
          </motion.div>

          {/* <motion.div className={`${styles.contactCard} ${styles.secondaryCard}`} variants={itemVariants}>
            <div className={styles.miniIcon}>
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <h4>Quick Call</h4>
            <a href={'tel:+18076317682'} className={styles.phoneLink}>
              (807) 631-7682
            </a>
            <span className={styles.availability}>Available weekdays</span>
          </motion.div> */}

          {/* <motion.div className={`${styles.contactCard} ${styles.secondaryCard}`} variants={itemVariants}>
            <div className={styles.miniIcon}>
              <FontAwesomeIcon icon={faMapPin} />
            </div>
            <h4>Based in</h4>
            <p className={styles.locationText}>Thunder Bay, Ontario</p>
            <span className={styles.timezone}>EST/EDT Time Zone</span>
          </motion.div> */}

          <motion.div className={`${styles.contactCard} ${styles.socialCard}`} variants={itemVariants}>
            <h4>Connect & Follow</h4>
            <p className={styles.socialText}>Check out my work and let's connect on social platforms</p>
            <div className={styles.socialButtons}>
              <motion.a 
                href={'https://github.com/identityex'} 
                target={'_blank'} 
                rel={'noreferrer'}
                className={styles.socialButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>GitHub</span>
              </motion.a>
              <motion.a 
                href={'https://www.linkedin.com/in/travis-arsenault-7113bab0/'} 
                target={'_blank'}
                rel={'noreferrer'}
                className={styles.socialButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faLinkedin} />
                <span>LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* <motion.div className={styles.bottomSection} variants={itemVariants}>
          <div className={styles.businessInfo}>
            <img className={styles.companyLogo} src={'/images/IDXLogo-White.png'} alt={'IDX Studios Canada Ltd.'}/>
            <div className={styles.businessDetails}>
              <h4>IDX Studios Canada Ltd.</h4>
              <div className={styles.businessHours}>
                <FontAwesomeIcon icon={faClock} />
                <span>Monday - Friday: 10:30am - 6:00pm EST</span>
              </div>
            </div>
          </div>
        </motion.div> */}
      </motion.div>
    </Section>
  );
}