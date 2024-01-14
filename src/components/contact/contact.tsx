import { Section } from '../section/Section.tsx';
import styles from './contact.module.css';

export function Contact() {
  return (
        <Section sectionId={'Contact'}>
            <h1>Contact Info</h1>
        {/*    3 Columns: 
                    1. Personal Info
                    2. Business Info
                    3. Social Media and Handles
             */}
            <div className={`${styles.row} ${styles.contactArea}`}>
                <div className={`${styles['col-md-4']}`}>
                    <h2>Personal Info</h2>
                    <p>Travis Arsenault</p>
                </div>
                <div className={`${styles['col-md-4']}`}>
                    <h2>Business Info</h2>
                    <p>Travis Arsenault</p>
                </div>
                <div className={`${styles['col-md-4']}`}>
                    <h2>Social Media</h2>
                    <p>Travis Arsenault</p>
                </div>
            </div>
            
        </Section>
  );
}
