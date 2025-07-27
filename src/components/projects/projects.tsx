import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBrain, 
  faCircleCheck, 
  faCode, 
  faStopCircle, 
  faExternalLinkAlt, 
} from '@fortawesome/free-solid-svg-icons';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import { Section } from '../section/Section';
import styles from './projects.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
}

const ProjectCard = ({ project, cld }: ProjectCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = useCallback(() => {
    // Navigate to project detail page
    navigate(`/project/${project.id}`);
  }, [navigate, project.id]);

  return (
    <div className={styles.projectCard} onClick={handleClick}>
      <div className={styles.projectImageOverlay}>
        {project.Video ? (
          <AdvancedVideo
            cldVid={cld.video(project.Video)}
            autoPlay
            muted
            loop
            playsInline
            className={styles.projectImage}
          />
        ) : project.cloudinaryImage ? (
          <AdvancedImage
            cldImg={cld.image(project.cloudinaryImage)}
            alt={project.Title}
            className={styles.projectImage}
            loading="lazy"
          />
        ) : (
          <img src={project.previewImage || ''} alt={project.Title} className={styles.projectImage} loading="lazy" />
        )}
        <div 
          className={`${styles.projectStatus} ${
            project.Status === ProjectStatus.Completed ? 'completed' :
              project.Status === ProjectStatus.InProgress ? 'inProgress' :
                project.Status === ProjectStatus.Planned ? 'planned' : 'onHold'
          }`}
          title={project.Status}
        >
          <FontAwesomeIcon
            icon={
              project.Status === ProjectStatus.Completed ? faCircleCheck :
                project.Status === ProjectStatus.InProgress ? faCode :
                  project.Status === ProjectStatus.Planned ? faBrain : faStopCircle
            }
          />
        </div>
      </div>
      <div className={styles.projectContent}>
        <h3>{project.Title}</h3>
        <p>{project.Description}</p>
        <div className={styles.projectMeta}>
          <div className={styles.projectSkills}>
            {project.Skills.slice(0, 5).map((skill, idx) => (
              <span key={idx} className={styles.skillBadge}>
                {skill}
              </span>
            ))}
            {project.Skills.length > 5 && (
              <span className={styles.moreSkills}>+{project.Skills.length - 5} more</span>
            )}
          </div>
          {project.Url && (
            <a 
              href={project.Url} 
              className={styles.projectLink}
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              View <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export function Projects({ skills }: ProjectsProps) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

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
        // Ensure we have a preview image
        previewImage: project.Image || project.Gif || undefined,
      }))
      ?.sort((a, b) => {
        // First sort by status
        const statusDiff = statusOrder[a.Status] - statusOrder[b.Status];
        if (statusDiff !== 0) return statusDiff;
        // Then by id
        return a.id.localeCompare(b.id);
      });

    if (skills.length > 0) {
      projectsData = projectsData.filter(project => 
        project.Skills.some(skill => 
          skills.includes(skill),
        ),
      );
    }

    setProjects(projectsData);
  }, [skills]);

  const renderThumb = useCallback(() => {
    return projects.map((project, index) => {
      const isSelected = activeIndex === index;
      const thumbnailSrc = project.previewImage || project.Gif || project.Image || '';
      
      return (
        <div 
          key={project.id} 
          className={`${styles.thumbnail} ${isSelected ? styles.selected : ''}`}
        >
          {project.Video ? (
            <AdvancedVideo
              cldVid={cld.video(project.Video)}
              autoPlay
              muted
              loop
              playsInline
              className={styles.thumbnailImage}
            />
          ) : project.cloudinaryImage ? (
            <AdvancedImage
              cldImg={cld.image(project.cloudinaryImage)}
              alt={project.Title}
              className={styles.thumbnailImage}
              loading="lazy"
            />
          ) : thumbnailSrc ? (
            <img 
              src={thumbnailSrc} 
              alt={project.Title} 
              className={styles.thumbnailImage}
              loading="lazy"
            />
          ) : (
            <div className={styles.thumbnailPlaceholder} />
          )}
        </div>
      );
    });
  },
  [activeIndex, projects, cld],
  );

  if (projects.length === 0) {
    return (
      <Section sectionId="projects">
        <h2 id="projects-heading">No projects found matching the selected skills</h2>
        <p>Try selecting different skills or clear the filters to see all projects.</p>
      </Section>
    );
  }

  return (
    <Section sectionId="projects">
      <h2 id="projects-heading">Featured Projects</h2>
      <p className="subtitle">A selection of my recent work and contributions</p>
      
      <div className={styles.projects}>
        <Carousel
          selectedItem={0}
          emulateTouch
          showArrows
          showIndicators={false}
          showStatus={false}
          showThumbs={projects.length > 1}
          useKeyboardArrows
          className={styles.carousel}
          renderThumbs={projects.length > 1 ? renderThumb : undefined}
          onChange={(index) => setActiveIndex(index)}
          transitionTime={300}
          swipeable={false}
          animationHandler="slide"
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className={`${styles.controlArrow} ${styles.controlPrev}`}
              >
                ‹
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className={`${styles.controlArrow} ${styles.controlNext}`}
              >
                ›
              </button>
            )
          }
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} cld={cld} />
          ))}
        </Carousel>
      </div>
    </Section>
  );
}
