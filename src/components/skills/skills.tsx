import { Section } from '../section/Section.tsx';
import { SkillItem } from './skill-item.tsx';
import { useState } from 'react';
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
  [SkillTypes.gameDevelopment]: { unity: 'Unity', unrealEngine: 'Unreal Engine', perforce: 'Perforce' },
  [SkillTypes.leadership]: {
    mentoring: 'Mentoring',
    projectManagement: 'Project Management',
    featurePlanning: 'Feature Planning',
    backendArchitecture: 'Backend Architecture',
    apiDesign: 'API Design',
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


export function Skills() {
  const [skillGroup, setSkillGroup] = useState('Primary');
  const [activeSkills, setActiveSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    if (activeSkills.includes(skill)) {
      setActiveSkills(activeSkills.filter((s) => s !== skill));
    } else {
      setActiveSkills([...activeSkills, skill]);
    }
  };

  const skillGroups = ['Primary', ...(Object.keys(skills)), 'All'];

  return (
        <Section sectionId={'Skills'}>
            <h1>Skills</h1>

            <div className={styles.skillsArea}>
                <div className={styles.skillGroups}>
                    {skillGroups.map((sg, index) => (
                        <button className={`${styles.skillGroup} ${sg === skillGroup ? styles.active : ''}`}
                                onClick={() => setSkillGroup(sg)} key={index}>{sg}</button>
                    ))}
                </div>

                <div className={styles.divider}/>

                <div className={styles.skills}>
                    {/* Print all skills only setting */}
                    {Object.keys(skills).map((sg, _) => (
                      Object.values(skills[sg]).map((skill, index) => (
                            <SkillItem skill={skill as string} key={index}
                                       isActive={activeSkills.includes(skill as string)}
                                       onClick={() => toggleSkill(skill as string)}
                                       isVisible={skillGroup === 'All' || (skillGroup === 'Primary' && primarySkills.includes(skill as string)) || sg == skillGroup}/>
                      ))
                    ))}
                </div>
            </div>
        </Section>
  );
}
