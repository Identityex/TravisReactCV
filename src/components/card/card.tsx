import styles from './card.module.scss';

type CardProps = {
  title: string;
  description: string;
  tags: string[];
};

// Card component
export function Card(props: CardProps) {
  const { title, description, tags } = props;
    
  return (
      <div className={styles.CardContainer}>
        <h2 className={styles.CardTitle}>{title}</h2>
        <hr />
        <p className={styles.CardDescription}>{description}</p>
        <hr />
        <ul className={styles.CardTags}>
            {tags.map((tag) => (
                <li className={styles.CardTag} key={tag}>{tag}</li>
            ))}
        </ul>
      </div>
  );
}
