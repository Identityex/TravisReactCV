import experiencesJson from './experiences.json';
import { Section } from '../section/Section.tsx';
import { ExperienceItem } from './experience-item.tsx';
import styles from './experiences.module.css';
import { useCallback, useEffect, useMemo, useState, memo } from 'react';

export interface ExperienceAccount {
  point: string;
  skillTypes: string[];
  description: string;
}

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  fromDate: string;
  toDate: string;
  location?: string;
  accounts: ExperienceAccount[];
}

interface ExperiencesProps {
  skills: string[];
}

export const Experiences = memo(function Experiences(props: ExperiencesProps) {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);

  const filterExperiences = useCallback(
    (experiencesData: ExperienceData[]) => {
      // Show all experiences when no skills are selected
      if (!props.skills || props.skills.length === 0) {
        return experiencesData;
      }

      return experiencesData.filter((experience) =>
        props.skills.some((skill) =>
          experience.accounts.some((account) =>
            account.skillTypes.some(
              (s) => s.toLowerCase() === skill.toLowerCase(),
            ),
          ),
        ),
      );
    },
    [props.skills],
  );

  useEffect(() => {
    const experiencesData = experiencesJson.data as ExperienceData[];
    const filteredData = filterExperiences(experiencesData);
    setExperiences(filteredData);
  }, [filterExperiences]);

  const sortedExperiences = useMemo(
    () =>
      [...experiences].sort((a, b) => {
        const dateA = a.toDate === 'Current' ? new Date() : new Date(a.toDate);
        const dateB = b.toDate === 'Current' ? new Date() : new Date(b.toDate);
        return dateB.getTime() - dateA.getTime();
      }),
    [experiences],
  );

  return (
    <Section sectionId={'Experiences'}>
      <div className={styles.experienceHeader}>
        <h1 id="Experiences-heading">Experience</h1>
        <p>14+ years of professional software development</p>
      </div>
      <div className={styles.experience}>
        {sortedExperiences.map((exp, index) => (
          <ExperienceItem
            item={exp}
            key={exp.id}
            index={index}
            skillFilters={props.skills}
          />
        ))}
      </div>
    </Section>
  );
});

