import { Section } from '../section/Section.tsx';
import styles from './my-info.module.scss';

import { Cloudinary } from '@cloudinary/url-gen';

// Import the responsive plugin
import { AdvancedImage, responsive } from '@cloudinary/react';

export function MyInfo() {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'idx-studios',
    },
  });

  return (
        <Section sectionId={'MyInfo'}>

            <AdvancedImage cldImg={cld.image('IDXStudios/Images/j1ybfvp01nt04y5nlfhu')}
                           plugins={[responsive({ steps: 200 })]}
                            className={styles.headerImage}
                           alt="Profile Picture"
            />

            <div className={styles.contentArea}>
                <h1 className={styles.headerTitle}>Travis Arsenault</h1>

                <p className={styles.headerSubtitle}>Senior Software Engineer</p>
                <p className={styles.summary}>
                    Experienced Senior Software Engineer with over 10 years in the tech industry, specializing in SaaS
                    solutions and large-scale system optimizations. Proven track record in reducing operating costs,
                    enhancing
                    system performance, and bolstering security. Adept at mentoring teams and driving innovation, I
                    bring a
                    blend of technical acumen and business insight to deliver impactful software solutions
                </p>
            </div>
        </Section>
  );
}
