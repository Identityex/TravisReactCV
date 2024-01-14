import styles from './skill-item.module.scss';

export interface SkillItemProps {
  skill: string;
  isVisible: boolean;
  isActive?: boolean;
  onClick: () => void;
}

export function SkillItem(props: SkillItemProps) {
  return (
        <button
            className={`${styles.skillItem} ${props.isActive && styles.active} ${props.isVisible ? styles.visible : styles.hidden}`}
            onClick={props.onClick}>
            {/*{props.imageUrl && <div className="skill-item__overlay"></div>}*/}
            <span>{props.skill}</span>
        </button>
  );
}
