import { Section } from '../section/Section.tsx';
import styles from './my-info.module.scss';

export function MyInfo() {
  return (
        <Section sectionId={'MyInfo'}>
            
            <img
                className={styles.headerImage}
                src="/images/vite.svg" alt="Vite Logo" />
            
            <div className={styles.contentArea}>
                <h1 className={styles.headerTitle}>Travis Arsenault</h1>

                <p className={styles.headerSubtitle}>Senior Software Engineer</p>
                <p className={styles.summary}>
                    I'm a software engineer with a passion for creating beautiful, intuitive user interfaces. I have experience working with a variety of languages and frameworks, but I specialize in React and TypeScript.
                </p>
            </div>
        </Section>
  );
}
