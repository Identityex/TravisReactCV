import { Params, useLoaderData, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faExternalLinkAlt, 
  faCircleCheck,
  faCode,
  faBrain,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import { ProjectStatus } from '../components/projects/projects.tsx';
import { ChangelogItem } from './changelog.tsx';
import { NoProjectPage } from './projects/NoProject.tsx';
import projectsJson from '../components/projects/projects.json';
import { staggerContainer, staggerItem } from '../utils/animations';
import styles from './project.module.scss';

export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  gif: string;
  video: string | null;
  status: ProjectStatus;
  expectedCompletion: string | null;
  url: string | null;
  changeLog: ChangelogItem[];
}

export async function loader({ params }: { params: Params<string> }) {
  // First try to load from project-details.json
  try {
    const data = await import('../assets/project-details.json');
    const detailedProject = data.projects.find((p) => p.slug === params.projectSlug);
    if (detailedProject) {
      return { projectData: detailedProject, hasDetails: true };
    }
  } catch (e) {
    // File might not exist, continue
  }

  // Fallback to projects.json data
  const basicProject = projectsJson.data.find((p) => p.id === params.projectSlug);
  if (basicProject) {
    // Convert to expected format
    const projectData: ProjectData = {
      slug: basicProject.id,
      title: basicProject.Title,
      description: basicProject.Description,
      gif: basicProject.Gif || '',
      video: basicProject.Video,
      status: basicProject.Status as ProjectStatus,
      expectedCompletion: null,
      url: basicProject.Url || null,
      changeLog: []
    };
    return { projectData, hasDetails: false };
  }

  return { projectData: null, hasDetails: false };
}

export function Project() {
  const { projectData, hasDetails } = useLoaderData() as { projectData: ProjectData | null; hasDetails: boolean };
  const navigate = useNavigate();
  
  const cld = new Cloudinary({
    cloud: { cloudName: 'idx-studios' },
  });

  if (!projectData) {
    return <NoProjectPage/>;
  }

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Completed:
        return faCircleCheck;
      case ProjectStatus.InProgress:
        return faCode;
      case ProjectStatus.Planned:
        return faBrain;
      default:
        return faStopCircle;
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Completed:
        return styles.completed;
      case ProjectStatus.InProgress:
        return styles.inProgress;
      case ProjectStatus.Planned:
        return styles.planned;
      default:
        return styles.onHold;
    }
  };

  // Get the full project data from projects.json for additional fields
  const fullProject = projectsJson.data.find(p => p.id === projectData.slug);

  return (
    <motion.div 
      className={styles.projectDetail}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.nav className={styles.navigation} variants={staggerItem}>
        <button 
          onClick={() => navigate(-1)} 
          className={styles.backButton}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
      </motion.nav>

      <motion.header className={styles.projectHeader} variants={staggerItem}>
        <div className={styles.headerContent}>
          <h1>{projectData.title}</h1>
          <div className={styles.projectMeta}>
            <span className={`${styles.status} ${getStatusColor(projectData.status)}`}>
              <FontAwesomeIcon icon={getStatusIcon(projectData.status)} />
              {projectData.status}
            </span>
            {projectData.url && (
              <a 
                href={projectData.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                Visit Project <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            )}
          </div>
        </div>
      </motion.header>

      <motion.div className={styles.projectImage} variants={staggerItem}>
        {projectData.video ? (
          <AdvancedVideo
            cldVid={cld.video(projectData.video)}
            autoPlay
            muted
            loop
            playsInline
            className={styles.media}
          />
        ) : fullProject?.cloudinaryImage ? (
          <AdvancedImage
            cldImg={cld.image(fullProject.cloudinaryImage)}
            alt={projectData.title}
            className={styles.media}
          />
        ) : projectData.gif ? (
          <img 
            src={projectData.gif} 
            alt={projectData.title} 
            className={styles.media}
          />
        ) : null}
      </motion.div>

      <motion.section className={styles.projectInfo} variants={staggerContainer}>
        <motion.div className={styles.description} variants={staggerItem}>
          <h2>About This Project</h2>
          <p>{projectData.description}</p>
        </motion.div>

        {fullProject?.Categories && (
          <motion.div className={styles.categories} variants={staggerItem}>
            <h3>Categories</h3>
            <div className={styles.categoryList}>
              {fullProject.Categories.map((category, index) => (
                <span key={index} className={styles.category}>
                  {category}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {fullProject?.Skills && (
          <motion.div className={styles.technologies} variants={staggerItem}>
            <h3>Technologies Used</h3>
            <div className={styles.skillGrid}>
              {fullProject.Skills.map((skill, index) => (
                <span key={index} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {hasDetails && projectData.changeLog && projectData.changeLog.length > 0 && (
          <motion.div className={styles.changelog} variants={staggerItem}>
            <h2>Project Timeline</h2>
            <div className={styles.changelogList}>
              {projectData.changeLog.map((item, index) => (
                <div key={index} className={styles.changelogItem}>
                  <span className={styles.date}>{item.date}</span>
                  <div>{item.changes.map((change, changeIndex) => <p key={changeIndex}>{change}</p>)}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {!hasDetails && (
          <motion.div className={styles.caseStudy} variants={staggerItem}>
            <h2>Case Study</h2>
            <div className={styles.comingSoon}>
              <p>Detailed case study coming soon...</p>
              <p>This section will include:</p>
              <ul>
                <li>Project challenges and solutions</li>
                <li>Technical architecture details</li>
                <li>Development process insights</li>
                <li>Results and impact metrics</li>
                <li>Lessons learned</li>
              </ul>
            </div>
          </motion.div>
        )}
      </motion.section>
    </motion.div>
  );
}
