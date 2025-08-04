import { Section } from '../section/Section.tsx';
import { SkillItem } from './skill-item.tsx';
import { useEffect, useState, useMemo, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './skills.module.scss';
import skillsData from './skills.json';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

interface SkillsProps {
  onSkillChange: (skills: string[]) => void;
}


export const Skills = memo(function Skills(props: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState('Primary');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [allSkills] = useState<Skill[]>(skillsData.data);

  // Get unique categories from the skills data
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allSkills.map(skill => skill.category)));
    return ['Primary', ...uniqueCategories.sort(), 'All'];
  }, [allSkills]);

  // Define primary skills - top skills with 90+ proficiency
  const primarySkills = useMemo(() => {
    return allSkills
      .filter(skill => skill.proficiency >= 90)
      .sort((a, b) => b.proficiency - a.proficiency)
      .slice(0, 15)
      .map(skill => skill.name);
  }, [allSkills]);

  const toggleSkill = useCallback((skillName: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillName)) {
        return prev.filter((s) => s !== skillName);
      } else {
        return [...prev, skillName];
      }
    });
  }, []);

  useEffect(() => {
    props.onSkillChange(selectedSkills);
  }, [selectedSkills, props]);

  // Filter skills based on selected category
  const visibleSkills = useMemo(() => {
    if (selectedCategory === 'All') {
      return allSkills;
    } else if (selectedCategory === 'Primary') {
      return allSkills.filter(skill => primarySkills.includes(skill.name));
    } else {
      return allSkills.filter(skill => skill.category === selectedCategory);
    }
  }, [selectedCategory, allSkills, primarySkills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.05,
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
        mass: 0.5,
        velocity: 2,
      },
    },
    exit: { 
      y: -10,
      opacity: 0,
      transition: {
        duration: 0.15,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <Section sectionId={'Skills'}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headingVariants}
        className={styles.headingContainer}
      >
        <h1 id="Skills-heading" className={styles.gradientHeading}>Core Competencies</h1>
        <p className={styles.subtitle}>14+ years of expertise across the full technology stack</p>
      </motion.div>
      
      <div className={styles.skillsArea}>
        <motion.div 
          className={styles.skillGroups}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {categories.map((category, index) => (
            <motion.button 
              className={`${styles.skillGroup} ${category === selectedCategory ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)} 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ 
                type: 'spring', 
                stiffness: 400, 
                damping: 15,
                duration: 0.1, 
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        <motion.div 
          className={styles.divider}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
        />
        
        <AnimatePresence mode="wait">
          <motion.div 
            className={styles.skills}
            key={selectedCategory}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            {visibleSkills.map((skill) => (
              <motion.div
                key={skill.id}
                variants={itemVariants}
                layout
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 18,
                  duration: 0.2,
                }}
              >
                <SkillItem
                  skill={skill.name}
                  isActive={selectedSkills.includes(skill.name)}
                  onClick={() => toggleSkill(skill.name)}
                  isVisible={true}
                  proficiency={skill.proficiency}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
});

// Keep these exports for backward compatibility
export const SkillTypes = {
  languages: 'Languages',
  backend: 'Backend',
  frontend: 'Frontend',
  cloud: 'Cloud',
  devops: 'DevOps',
  artificialIntelligence: 'AI/ML',
  dataEngineering: 'Database',
  cyberSecurity: 'Security',
  gameDevelopment: 'Game Development',
  leadership: 'Soft Skills',
  architecture: 'Architecture',
  api: 'API',
  development: 'Development',
  methodology: 'Methodology',
  tools: 'Tools',
  infrastructure: 'Infrastructure',
};

// Create a skills object from the JSON data for backward compatibility
export const skills = skillsData.data.reduce((acc, skill) => {
  const category = skill.category;
  if (!acc[category]) {
    acc[category] = {};
  }
  acc[category][skill.name.toLowerCase().replace(/[\s/.+-]/g, '')] = skill.name;
  return acc;
}, {} as Record<string, Record<string, string>>);

export const primarySkills = skillsData.data
  .filter(skill => skill.proficiency >= 90)
  .map(skill => skill.name);