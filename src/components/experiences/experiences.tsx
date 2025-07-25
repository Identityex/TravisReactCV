import experiencesJson from './experiences.json';
import { Section } from '../section/Section.tsx';
import { ExperienceItem } from './experience-item.tsx';
import styles from './experiences.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
  accounts: ExperienceAccount[];
}

interface ExperiencesProps {
  skills: string[];
}

export function Experiences(props: ExperiencesProps) {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);

  const filterExperiences = useCallback(
    (experiencesData: ExperienceData[]) => {
      if (props.skills.length === 0) return experiencesData;

      return experiencesData.filter((experience) =>
        props.skills.some((skill) =>
          experience.accounts.some((account) =>
            account.skillTypes.some(
              (s) => s.toLowerCase() === skill.toLowerCase()
            )
          )
        )
      );
    },
    [props.skills]
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
    [experiences]
  );

  return (
    <Section sectionId={'Experiences'}>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2">
          Experience
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg mt-2 max-w-2xl">
          A journey through my professional experiences and achievements
        </p>
      </div>
      <div
        className={`${styles.experience} grid grid-cols-1 md:grid-cols-2 gap-8 w-full`}
      >
        {sortedExperiences
          .filter(Boolean)
          .map((exp, index) => (
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
}

