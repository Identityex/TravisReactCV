import experiences from './experiences.json';
import { Section } from '../section/Section.tsx';
import { ExperienceItem } from './experience-item.tsx';
import styles from './experiences.module.scss';


export interface ExperienceAccount {
  skillTypes: string[],
  description: string
}

export interface ExperienceData {
  id: string,
  role: string,
  company: string
  fromDate: string,
  toDate: string,
  accounts: ExperienceAccount[]
}

export function Experiences() {
  // Load data from json file
  const experienceData = experiences.data as ExperienceData[];
    
  return (
        <Section sectionId={'Experiences'}>
            <h1>Experience</h1>
            
            <div className={`${styles.experience} flex flex-row justify-between items-center`}>
                {experienceData
                  .filter((exp) => exp != null)
                  .map((exp) => (
                    <ExperienceItem item={exp} key={exp.id} />
                  ))}
            </div>
        </Section>
  );   
}
