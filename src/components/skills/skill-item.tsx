import { motion } from 'framer-motion';
import styles from './skill-item.module.scss';

export interface SkillItemProps {
  skill: string;
  isVisible: boolean;
  isActive?: boolean;
  onClick: () => void;
  proficiency?: number;
}

export function SkillItem(props: SkillItemProps) {
  const proficiencyColor = props.proficiency 
    ? props.proficiency >= 90 ? 'rgba(102, 126, 234, 0.8)' 
      : props.proficiency >= 85 ? 'rgba(118, 75, 162, 0.8)'
        : 'rgba(139, 92, 246, 0.8)'
    : 'rgba(105, 105, 105, 0.5)';

  return (
    <motion.div
      className={styles.skillItemContainer}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.button
        className={styles.skillItem}
        onClick={props.onClick}
        aria-label={`Filter by ${props.skill} skill`}
        aria-pressed={props.isActive}
        initial={false}
        animate={{
          borderColor: props.isActive ? proficiencyColor : 'rgba(255, 255, 255, 0.1)',
          scale: 1,
          transition: { duration: 0.3 },
        }}
        style={{
          background: props.isActive 
            ? `linear-gradient(135deg, ${proficiencyColor} 0%, rgba(255, 255, 255, 0.1) 100%)`
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          boxShadow: props.isActive 
            ? `0 8px 24px ${proficiencyColor.replace('0.8', '0.3')}`
            : '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        <span className={styles.skillName}>{props.skill}</span>
        {props.proficiency && (
          <div className={styles.proficiencyBar}>
            <motion.div 
              className={styles.proficiencyFill}
              initial={{ width: 0 }}
              animate={{ width: `${props.proficiency}%` }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{ backgroundColor: proficiencyColor }}
            />
          </div>
        )}
      </motion.button>
    </motion.div>
  );
}
