import { Section } from '../section/Section.tsx';
import { SkillItem } from './skill-item.tsx';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './skills.module.scss';

export const SkillTypes = {
  languages: 'Languages',
  backend: 'Backend',
  frontend: 'Frontend',
  cloud: 'Cloud',
  devops: 'DevOps',
  artificialIntelligence: 'Artificial Intelligence / Machine Learning',
  dataEngineering: 'Data Engineering',
  cyberSecurity: 'Cyber Security',
  gameDevelopment: 'Game Development',
  leadership: 'Leadership',
  other: 'Other',
};

export const skills = {
  [SkillTypes.languages]: {
    typescript: 'Typescript',
    javascript: 'Javascript',
    cSharp: 'C#',
    cPlusPlus: 'C++',
    python: 'Python',
    java: 'Java',
    go: 'GO',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    sql: 'SQL',
    graphQl: 'GraphQL',
    bash: 'Bash',
    powerShell: 'PowerShell',
    php: 'PHP',
    handlebars: 'Handlebars',
    make: 'Make',
    bashScript: 'Bash Script',
    shellScript: 'Shell Script',
    batchScript: 'Batch Script',
  },
  [SkillTypes.backend]: {
    nodeJS: 'NodeJS',
    express: 'Express',
    nestJS: 'NestJS',
    aspNet: 'ASP.NET',
    netCore: '.NET Core',
    mvc: 'MVC',
    entityFramework: 'Entity Framework',
    shopify: 'Shopify',
    wordpress: 'Wordpress',
    koa: 'Koa',
    prisma: 'Prisma',
    git: 'Git',
    firebase: 'Firebase',
    hydrogen: 'Hydrogen',
  },
  [SkillTypes.frontend]: {
    react: 'React',
    nextJS: 'NextJS',
    vue: 'Vue',
    nuxtJS: 'NuxtJS',
    jQuery: 'jQuery',
    bootstrap: 'Bootstrap',
    foundation: 'Foundation',
    sass: 'SASS',
    scss: 'SCSS',
    styledComponents: 'Styled Components',
    storybook: 'Storybook',
    elementor: 'Elementor',
    wordpress: 'Wordpress',
    shopify: 'Shopify',
  },
  [SkillTypes.cloud]: {
    aws: 'AWS',
    azure: 'Azure',
    googleCloudPlatform: 'Google Cloud Platform',
    firebase: 'Firebase',
    vercel: 'Vercel',
    digitalOcean: 'Digital Ocean',
    apache: 'Apache',
    nginx: 'Nginx',
    gitHub: 'GitHub',
    gitLab: 'GitLab',
    bitBucket: 'BitBucket',
    wordpress: 'Wordpress',
  },
  [SkillTypes.devops]: {
    docker: 'Docker',
    terraform: 'Terraform',
    gitHubActions: 'GitHub Actions',
    gitLabCiCd: 'GitLab CI/CD',
    azureDevOps: 'Azure DevOps',
  },
  [SkillTypes.artificialIntelligence]: {
    tensorflow: 'Tensorflow',
    pyTorch: 'PyTorch',
    openCV: 'OpenCV',
    scikitLearn: 'Scikit-Learn',
    numpy: 'Numpy',
    pandas: 'Pandas',
    matplotlib: 'Matplotlib',
  },
  [SkillTypes.dataEngineering]: {
    postgreSQL: 'PostgreSQL',
    firestore: 'Firestore',
    sqlite: 'SQLite',
    sql: 'SQL',
    noSQL: 'NoSQL',
    mySQL: 'MySQL',
    tSQL: 'T-SQL',
    redis: 'Redis',
    memCached: 'MemCached',
    elasticSearch: 'ElasticSearch',
    kafka: 'Kafka',
    bigQuery: 'BigQuery',
  },
  [SkillTypes.cyberSecurity]: {
    nmap: 'Nmap',
    burpSuite: 'Burp Suite',
    codeAndInfrastructureAnalysis: 'Code and Infrastructure Analysis',
  },
  [SkillTypes.gameDevelopment]: { unity: 'Unity', unrealEngine: 'Unreal Engine', perforce: 'Perforce', thundernetes: 'Thundernetes', playfab: 'Playfab', gameplayAbilitySystem: 'Gameplay Ability System', serializedComponents: 'Serialized Components', blueprints: 'Blueprints', unrealScript: 'UnrealScript' },
  [SkillTypes.leadership]: {
    mentoring: 'Mentoring',
    projectManagement: 'Project Management',
    featurePlanning: 'Feature Planning',
    backendArchitecture: 'Backend Architecture',
    apiDesign: 'API Design',
    webDesign: 'Web Design',
    agile: 'Agile',
    scrum: 'Scrum',
    kanban: 'Kanban',
  },
  [SkillTypes.other]: {
    jira: 'Jira',
    mondayCom: 'Monday.com',
    notion: 'Notion',
    trello: 'Trello',
    adobeXd: 'Adobe XD',
    flStudio: 'FL Studio',
    adobePremierePro: 'Adobe Premiere Pro',
    figma: 'Figma',
    eComm: 'E-Commerce',
  },
};

export const primarySkills = [
  skills[SkillTypes.languages].typescript,
  skills[SkillTypes.languages].go,
  skills[SkillTypes.languages].cSharp,
  skills[SkillTypes.languages].python,
  skills[SkillTypes.backend].nodeJS,
  skills[SkillTypes.backend].netCore,
  skills[SkillTypes.frontend].react,
  skills[SkillTypes.cloud].googleCloudPlatform,
  skills[SkillTypes.devops].docker,
  skills[SkillTypes.devops].terraform,
  skills[SkillTypes.dataEngineering].postgreSQL,
  skills[SkillTypes.dataEngineering].redis,
  skills[SkillTypes.dataEngineering].bigQuery,
  skills[SkillTypes.artificialIntelligence].pyTorch,
];

interface SkillsProps {
  onSkillChange: (skills: string[]) => void;
}

export function Skills(props: SkillsProps) {
  const [skillGroup, setSkillGroup] = useState('Primary');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);


  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  useEffect(() => {
    // Pass the actual selected skills to parent components
    props.onSkillChange(selectedSkills);
  }, [selectedSkills]);

  const skillGroups = ['Primary', ...(Object.keys(skills)), 'All'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,  // Reduced from 0.05 for faster staggering
        delayChildren: 0.05,    // Reduced from 0.1 for faster start
        duration: 0.2          // Added for smoother transitions
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },  // Reduced from y:20 for less movement
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,          // Increased from 100 for snappier animation
        damping: 15,             // Adjusted for smoother stop
        mass: 0.5,               // Added for better control
        velocity: 2              // Added for initial velocity
      }
    },
    exit: { 
      y: -10,                    // Reduced from y:-20 for less movement
      opacity: 0,
      transition: {
        duration: 0.15           // Faster exit
      }
    }
  };



  return (
    <Section sectionId={'Skills'}>
      <h1>Skills</h1>
      <div className={styles.skillsArea}>
        <motion.div 
          className={styles.skillGroups}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {skillGroups.map((sg, index) => (
            <motion.button 
              className={`${styles.skillGroup} ${sg === skillGroup ? styles.active : ''}`}
              onClick={() => setSkillGroup(sg)} 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ 
                type: 'spring', 
                stiffness: 400, 
                damping: 15,
                duration: 0.1 
              }}
            >
              {sg}
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
            key={skillGroup}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            {Object.keys(skills).map((sg) =>
              Object.values(skills[sg]).map((skill, index) => {
                const isVisible = skillGroup === 'All' || 
                               (skillGroup === 'Primary' && primarySkills.includes(skill as string)) || 
                               sg === skillGroup;
                
                if (!isVisible) return null;
                
                return (
                  <motion.div
                    key={`${skill}-${index}`}
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
                      skill={skill as string}
                      isActive={selectedSkills.includes(skill as string)}
                      onClick={() => toggleSkill(skill as string)}
                      isVisible={true}
                    />
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

