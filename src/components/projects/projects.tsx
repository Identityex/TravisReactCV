import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBrain, 
  faCircleCheck, 
  faCode, 
  faStopCircle, 
  faExternalLinkAlt,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../section/Section';
import styles from './projects.module.scss';
import projectsJson from './projects.json';

interface ProjectsJson {
  data: ProjectData[];
}

export enum ProjectStatus {
  Completed = 'Completed',
  InProgress = 'In Progress',
  Planned = 'Planned',
  OnHold = 'On Hold',
  Cancelled = 'Cancelled',
}

export interface ProjectData {
  id: string;
  Title: string;
  Description: string;
  Categories: string[];
  Skills: string[];
  Status: ProjectStatus;
  Url?: string | null;
  Video?: string | null;
  cloudinaryImage?: string | null;
  Gif?: string | null;
  Image?: string | null;
  previewImage?: string | null;
}

interface ProjectsProps {
  skills: string[];
}

interface ProjectCardProps {
  project: ProjectData;
  cld: Cloudinary;
  index: number;
}

const ProjectCard = ({ project, cld, index }: ProjectCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleClick = useCallback(() => {
    navigate(`/project/${project.id}`);
  }, [navigate, project.id]);

  const getStatusIcon = () => {
    switch (project.Status) {
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

  const getStatusClass = () => {
    switch (project.Status) {
      case ProjectStatus.Completed:
        return styles.statusCompleted;
      case ProjectStatus.InProgress:
        return styles.statusInProgress;
      case ProjectStatus.Planned:
        return styles.statusPlanned;
      default:
        return styles.statusOnHold;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={styles.projectCard}
      onClick={handleClick}
    >
      <div className={styles.cardInner}>
        {/* Image Section */}
        <div className={styles.imageWrapper}>
          <div className={`${styles.imagePlaceholder} ${imageLoaded ? styles.loaded : ''}`}>
            {project.Video ? (
              <AdvancedVideo
                cldVid={cld.video(project.Video)}
                autoPlay
                muted
                loop
                playsInline
                className={styles.projectMedia}
                onLoadedData={() => setImageLoaded(true)}
              />
            ) : project.cloudinaryImage ? (
              <AdvancedImage
                cldImg={cld.image(project.cloudinaryImage)}
                alt={project.Title}
                className={styles.projectMedia}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
              />
            ) : project.previewImage || project.Gif || project.Image ? (
              <img 
                src={project.previewImage || project.Gif || project.Image || ''} 
                alt={project.Title} 
                className={styles.projectMedia}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <div className={styles.noImage}>
                <FontAwesomeIcon icon={faCode} />
              </div>
            )}
          </div>
          
          {/* Status Badge */}
          <div className={`${styles.statusBadge} ${getStatusClass()}`}>
            <FontAwesomeIcon icon={getStatusIcon()} />
            <span>{project.Status}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          <h3 className={styles.title}>{project.Title}</h3>
          <p className={styles.description}>{project.Description}</p>
          
          {/* Skills */}
          <div className={styles.skills}>
            {project.Skills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className={styles.skill}>
                {skill}
              </span>
            ))}
            {project.Skills.length > 4 && (
              <span className={styles.moreSkills}>+{project.Skills.length - 4}</span>
            )}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.viewDetails} aria-label={`View ${project.Title} details`}>
              View Details
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            {project.Url && (
              <a 
                href={project.Url} 
                className={styles.externalLink}
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Visit ${project.Title} website`}
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function Projects({ skills }: ProjectsProps) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const cld = new Cloudinary({
    cloud: { cloudName: 'idx-studios' },
  });

  useEffect(() => {
    const statusOrder = {
      [ProjectStatus.Completed]: 0,
      [ProjectStatus.InProgress]: 1,
      [ProjectStatus.Planned]: 2,
      [ProjectStatus.OnHold]: 3,
      [ProjectStatus.Cancelled]: 4,
    };

    let projectsData = ((projectsJson as ProjectsJson).data)
      ?.map(project => ({
        ...project,
        previewImage: project.Image || project.Gif || undefined,
      }))
      ?.sort((a, b) => {
        const statusDiff = statusOrder[a.Status] - statusOrder[b.Status];
        if (statusDiff !== 0) return statusDiff;
        return a.id.localeCompare(b.id);
      });

    if (skills.length > 0) {
      projectsData = projectsData.filter(project => 
        project.Skills.some(skill => 
          skills.includes(skill),
        ),
      );
    }

    if (filter !== 'all') {
      projectsData = projectsData.filter(project => 
        project.Status === filter
      );
    }

    setProjects(projectsData);
  }, [skills, filter]);

  // Get unique statuses for filter buttons
  const statuses = ['all', ...Array.from(new Set(projectsJson.data.map(p => p.Status)))];

  if (projects.length === 0 && skills.length > 0) {
    return (
      <Section sectionId="projects">
        <div className={styles.header}>
          <h2 id="projects-heading">Projects</h2>
          <p className={styles.subtitle}>No projects found matching the selected skills</p>
        </div>
      </Section>
    );
  }

  return (
    <Section sectionId="projects">
      <div className={styles.header}>
        <h2 id="projects-heading">Featured Projects</h2>
        <p className={styles.subtitle}>A selection of my recent work and contributions</p>
      </div>
      
      {/* Filter Buttons */}
      <div className={styles.filterButtons}>
        {statuses.map(status => (
          <button
            key={status}
            className={`${styles.filterButton} ${filter === status ? styles.active : ''}`}
            onClick={() => setFilter(status)}
          >
            {status === 'all' ? 'All Projects' : status}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          className={styles.projectsGrid}
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              cld={cld} 
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}