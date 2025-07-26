import { Section } from '../section/Section.tsx';
import styles from './my-info.module.scss';
import { motion } from 'framer-motion';
import { Cloudinary } from '@cloudinary/url-gen';

// Import the responsive plugin
import { AdvancedImage, responsive } from '@cloudinary/react';

export function MyInfo() {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'idx-studios',
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
        <Section sectionId={'MyInfo'}>
            <motion.div
                className={styles.myInfoContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={imageVariants}>
                    <AdvancedImage cldImg={cld.image('IDXStudios/Images/j1ybfvp01nt04y5nlfhu')}
                                   plugins={[responsive({ steps: 200 })]}
                                   className={styles.headerImage}
                                   alt="Profile Picture"
                                   loading="eager"
                                   fetchpriority="high"
                    />
                </motion.div>

                <div className={styles.contentArea}>
                    <motion.h1 id="MyInfo-heading" className={styles.headerTitle} variants={itemVariants}>
                        Travis Arsenault
                    </motion.h1>

                    <motion.p className={styles.headerSubtitle} variants={itemVariants}>
                        Senior Software Engineer
                    </motion.p>
                    
                    <motion.p className={styles.summary} variants={itemVariants}>
                        Senior Software Engineer with 14+ years architecting mission-critical systems that scale from startup to enterprise. 
                        Built platforms supporting 50x user growth while cutting infrastructure costs 50%+. Technical leader who mentors teams, 
                        drives architectural decisions, and champions engineering excellence. Expert in cloud infrastructure, microservices, 
                        and turning complex business problems into elegant technical solutions.
                    </motion.p>
                </div>
            </motion.div>
        </Section>
  );
}
