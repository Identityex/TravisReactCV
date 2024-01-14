import styles from './account-item.module.css';
import {ExperienceAccount} from "../experiences/experiences.tsx";
import Card from 'react-bootstrap/Card';

export interface AccountItemProps {
    account: ExperienceAccount;
    key: number;
}

// Want a card style component
export function AccountItem(props: AccountItemProps) {
    return (
        // <div className={styles.accountItem} key={props.key}>
        //     <div className={styles.point}>
        //         <p>{props.account.point}</p>
        //     </div>
        //     <div className={styles.accountItem__description}>
        //         {props.account.description}
        //     </div>
        // </div>
        <Card 
            key={props.key}
            bg={'dark'}
            text={'light'}
            className="mb-2"
        >
            <Card.Header 
                className={styles.accountPoint}
            >
                <Card.Title>{props.account.point}</Card.Title>
            </Card.Header>
            <Card.Body 
                className={styles.accountDescription}
            >
                <Card.Text>
                    {props.account.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
