import { ExperienceData } from './experiences.tsx';
import styles from './experience-item.module.css';
import { Card } from '../card/card.tsx';


export interface ExperienceItemProps {
  children?: React.ReactNode;
  skillFilters?: string[];
  index: number;
  item: ExperienceData;
}

export function ExperienceItem(props: ExperienceItemProps) {
  // Change date from yyyy-mm-dd to MM, yyyy
  const fromDateString = new Date(props.item.fromDate).toLocaleString('en-us', { month: 'long', year: 'numeric' });
  const toDateString = props.item.toDate == 'Current' ? 'Current' : 
    new Date(props.item.toDate).toLocaleString('en-us', { month: 'long', year: 'numeric' });
  
  const dateString = `${fromDateString} - ${toDateString}`;

  return (
        <div id={props.item.id}
             className={`${styles.experienceItem} ${props.index % 2 == 0 ? styles.left : styles.right}`}>
            <h3 className={styles.position}>{props.item.role}</h3>
            <div className={`${styles.experienceItem__title}  `}>
                <div className={`${styles.bubble} ${styles.row}`}>
                    <span
                        className={`${styles.company} ${styles['col-sm-12']}`}>{props.item.company} / {dateString}</span>
                </div>
            </div>
            <div className={styles.cardArea} >
                {props.item.accounts.map((account, index) => (
                    <Card key={index} title={account.point} description={account.description} tags={account.skillTypes.slice(0, 3)} />
                ))}
            </div>
        </div>
  );

}
