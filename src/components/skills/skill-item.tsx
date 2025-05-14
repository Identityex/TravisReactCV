import { motion } from 'framer-motion';
import styles from './skill-item.module.scss';

export interface SkillItemProps {
  skill: string;
  isVisible: boolean;
  isActive?: boolean;
  onClick: () => void;
}

export function SkillItem(props: SkillItemProps) {
  return (
    <motion.button
      className={styles.skillItem}
      onClick={props.onClick}
      initial={false}
      animate={{
        backgroundColor: props.isActive ? 'rgba(100, 100, 230, 0.7)' : 'rgba(105, 105, 105, 0.5)',
        color: props.isActive ? '#ffffff' : 'var(--color-black)',
        scale: 1,
        transition: { duration: 0 }
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        boxShadow: props.isActive 
          ? '0 3px 8px rgba(100, 100, 230, 0.3)'
          : '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      {props.skill}
    </motion.button>
  );
}
