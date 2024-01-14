import styles from './footer.module.scss';
import { Section } from '../components/section/Section.tsx';

export function Footer() {
//     Should highlight my company name, and copywrite
  const currentYear = new Date().getFullYear();

  return (
        <Section sectionId={'Footer'} className={styles.footer}>
            <div>
                <p>
                    <strong>IDX Studios Canada Ltd.</strong> &copy; {currentYear}.
                </p>
            </div>
        </Section>
  );
}
