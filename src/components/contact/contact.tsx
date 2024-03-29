import { Section } from '../section/Section.tsx';
import styles from './contact.module.css';

export function Contact() {
  return (
        <Section sectionId={'Contact'}>

            <img className={styles.companyLogo} src={'/images/IDXLogo-White.png'} alt={'IDX Studios Canada Ltd.'}/>
            <div className={`${styles.row} ${styles.contactArea}`}>
                <div className={`${styles['col-md-4']} ${styles['col-sm-12']}`}>
                    <h2>Hours of Operation</h2>
                    <div className={styles.hours}>
                        <p>Monday - Friday</p>
                        <p>10:30am - 6:00pm</p>
                    </div>
                </div>
                <div className={`${styles['col-md-4']} ${styles['col-sm-12']}`}>
                    <h2>Business Info</h2>
                    <div className={styles.businessInfo}>
                        <p>IDX Studios Canada Ltd.</p>
                        <p>Thunder Bay, Ontario</p>
                        <p>Canada</p>
                        <p>Email: <a href={'mailto:identityex@idxstudios.ca'}>identityex@idxstudios.ca</a></p>
                    </div>
                </div>
                
                <div className={`${styles['col-md-4']} ${styles['col-sm-12']} ${styles.socials}`}>
                    <h2>Socials</h2>
                    <div className={styles.socialArea}>
                        <div className={styles.social}>
                            <a href={'https://github.com/identityex'} target={'_blank'} rel={'noreferrer'}>
                                <img className={styles.socialImage} src={'/images/github-mark-white.svg'}
                                     alt={'Github'}/>
                            </a>
                        </div>

                        <div className={styles.social}>
                            <a href={'https://www.linkedin.com/in/travis-arsenault-7113bab0/'} target={'_blank'}
                               rel={'noreferrer'}>
                                <img className={styles.socialImage} src={'/images/LI-In-Bug.png'} alt={'LinkedIn'}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
  );
}
