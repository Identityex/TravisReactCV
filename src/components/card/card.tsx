import { memo } from 'react';
import styles from './card.module.scss';

type CardProps = {
  title: string;
  description: string;
  tags: string[];
};

export const Card = memo(function Card({ title, description, tags }: CardProps) {
  return (
    <div className={styles.CardContainer}>
      <h2 className={styles.CardTitle}>{title}</h2>
      <p className={styles.CardDescription}>{description}</p>
      <ul className={styles.CardTags}>
        {tags.map((tag) => (
          <li className={styles.CardTag} key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
});
