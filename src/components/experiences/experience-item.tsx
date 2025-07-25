import { ExperienceData } from './experiences.tsx';
import styles from './experience-item.module.css';
import { Card } from '../card/card.tsx';
import { memo } from 'react';

export interface ExperienceItemProps {
  children?: React.ReactNode;
  skillFilters?: string[];
  index: number;
  item: ExperienceData;
}

export const ExperienceItem = memo(function ExperienceItem(props: ExperienceItemProps) {
  const formatDate = (date: string) => {
    return date === 'Current' ? date :
      new Date(date).toLocaleString('en-us', { month: 'long', year: 'numeric' });
  };

  const fromDateString = formatDate(props.item.fromDate);
  const toDateString = formatDate(props.item.toDate);
  const dateString = `${fromDateString} - ${toDateString}`;

  return (
    <div
      id={props.item.id}
      className={`${styles.experienceItem} ${props.index % 2 === 0 ? styles.left : styles.right}`}
    >
      <div className={styles.header}>
        <h3 className={styles.position}>{props.item.role}</h3>
        <div className={styles.company}>
          {props.item.company} · {dateString}
        </div>
      </div>
      <div className={styles.cardArea}>
        {props.item.accounts.map((account, index) => (
          <Card
            key={`${props.item.id}-account-${index}`}
            title={account.point}
            description={account.description}
            tags={account.skillTypes.slice(0, 3)}
          />
        ))}
      </div>
    </div>
  );
});

