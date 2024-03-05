import experiencesJson from './experiences.json';
import { Section } from '../section/Section.tsx';
import { ExperienceItem } from './experience-item.tsx';
import styles from './experiences.module.scss';
import { useEffect, useState } from 'react';


export interface ExperienceAccount {
  point: string;
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

interface ExperiencesProps {
  skills: string[];
}

export function Experiences(props: ExperiencesProps) {

  const [experiences, setExperiences] = useState<ExperienceData[]>([]);

  useEffect(() => {
    const experiencesData = experiencesJson.data as ExperienceData[];

    if (props.skills.length > 0) {
      const filteredExperiences = experiencesData.filter((experience) => {
        return props.skills.some((skill) => experience.accounts.some((account) => account.skillTypes.some((s) => s.toLowerCase() == skill.toLowerCase())));
      });

      console.log(filteredExperiences);
      console.log(props.skills);
      setExperiences(filteredExperiences);
    } else {
      setExperiences(experiencesData);
    }
  }, [props.skills]);

  return (
        <Section sectionId={'Experiences'}>
            <h1>Experience</h1>

            <div className={`${styles.experience} flex flex-row justify-between items-center`}>
                {experiences
                  .filter((exp) => exp != null)
                  .map((exp, index) => (
                        <ExperienceItem item={exp} key={exp.id} index={index}/>
                  ))}
            </div>
        </Section>
  );
}
