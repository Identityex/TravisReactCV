import { ExperienceData } from './experiences.tsx';
import styles from './experience-item.module.css';
import {AccountItem} from "../skills/account-item.tsx";


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
                        className={`${styles.company} ${styles['col-lg-3']} ${styles['col-sm-12']}`}>{props.item.company}</span>
                    {/* Hide when screen is small */}
                    <span className={`${styles.spacer} ${styles['col-lg-1']}`} style={
                        { textAlign: 'center' }
                    }> / </span>
                    <div className={`${styles.date} ${styles['col-lg-4']} ${styles['col-sm-12']}`}>{dateString}</div>
                </div>
            </div>
            <div className={styles.experienceAccount}>
                {/*<ul className={styles.accountList}>*/}
                {/*    {props.item.accounts*/}
                {/*      .filter(account => account.skillTypes.some(skillType => props.skillFilters?.includes(skillType)) || !props.skillFilters?.length)*/}
                {/*      .slice(0, 4)*/}
                {/*      .map((account, index) => (*/}
                {/*            <li key={index}>*/}
                {/*                {account.description}*/}
                {/*            </li>*/}
                {/*      ))}*/}
                {/*</ul>*/}
                {props.item.accounts.map((account, index) => (
                    AccountItem({account: account, key: index})
                ))}
            </div>
        </div>
  );

}
