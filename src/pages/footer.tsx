import styles from './footer.module.scss';
import { Section } from '../components/section/Section.tsx';
import { Link } from 'react-router-dom';

export function Footer() {
//     Should highlight my company name, and copywrite
  const currentYear = new Date().getFullYear();

  return (
        <Section sectionId={'Footer'} className={styles.footer}>
            <div className={styles.footerWrapper}>
                <p>
                    <strong>IDX Studios Canada Ltd.</strong> &copy; {currentYear}.
                </p>
                
                <Link className={styles.changelogLink} to={'changelog'} target={'_blank'}>Changelog</Link>
            </div>
        </Section>
  );
}
