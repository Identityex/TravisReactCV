import { Section } from '../section/Section.tsx';
import styles from './contact.module.css';

export function Contact() {
  return (
        <Section sectionId={'Contact'}>

            <img className={styles.companyLogo} src={'/images/IDXLogo-White.png'} alt={'IDX Studios Canada Ltd.'}/>
            <div className={`${styles.row} ${styles.contactArea}`}>
                <div className={`${styles['col-md-4']} ${styles['col-sm-12']}`}>
                    <h2>Personal Info</h2>
                    <p>Travis Arsenault</p>
                </div>
                <div className={`${styles['col-md-4']} ${styles['col-sm-12']}`}>
                    <h2>Business Info</h2>
                    <p>Travis Arsenault</p>
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
