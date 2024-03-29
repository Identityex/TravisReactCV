import { Section } from '../section/Section.tsx';
import { ReactElement, useEffect, useState } from 'react';
import projectsJson from './projects.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import styles from './projects.module.scss';
import './projects-global.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faCircleCheck, faCode, faStopCircle } from '@fortawesome/free-solid-svg-icons';

import { Cloudinary } from '@cloudinary/url-gen';

// Import the responsive plugin
import { AdvancedImage, responsive } from '@cloudinary/react';

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
  Gif: string;
  cloudinaryImage?: string;
  Video: string | null;
  Status: ProjectStatus;
  Url: string | null;
}

interface ProjectsProps {
  skills: string[];
}

export function Projects(props: ProjectsProps) {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    const projectsData = projectsJson.data as ProjectData[];

    if (props.skills.length > 0) {
      const filteredProjects = projectsData.filter((project) => {
        return props.skills.some((skill) => project.Description.toLowerCase().includes(skill.toLowerCase()));
      });
      setProjects(filteredProjects);
    } else {
      setProjects(projectsData);
    }
  }, [props.skills]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dm2o9jrso',
    },
  });

  return (
        <Section sectionId={'Projects'}>
            <h1>Projects</h1>
            <Carousel
                emulateTouch={true}
                className={`${styles.projects}`}
                showIndicators={false}
                useKeyboardArrows={true}
                infiniteLoop={true}
                showStatus={false}
                selectedItem={projects.length - 1}
                renderThumbs={(children) => children.map((project) => (
                    <div>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                        {(project as ReactElement).props.children[0].props.children.props.children[0]}
                    </div>
                ))}
            >
                {projects.map((project) => (
                    <div key={project.id}>
                        <div className={`${styles.projectImage}`} onClick={() => project.Url && window.open(project.Url, '_blank')}>
                            <div className={styles.projectImageOverlay}>
                                {project.cloudinaryImage ? <AdvancedImage
                                    cldImg={cld.image(project.cloudinaryImage)}
                                    plugins={[responsive({ steps: 200 })]}
                                    alt={project.Title}
                                    className={'project-image'}
                                /> : <img src={project.Gif} alt={project.Title} />}
                                <FontAwesomeIcon
                                    className={`${styles.projectStatus} ${project.Status === ProjectStatus.Completed 
                                      ? styles.completed : 
                                      project.Status === ProjectStatus.InProgress ? styles.inProgress :
                                        project.Status === ProjectStatus.Planned ? styles.planned :
                                          project.Status === ProjectStatus.OnHold ? styles.onHold :
                                            styles.inProgress}`}
                                    icon={project.Status === ProjectStatus.Completed ? faCircleCheck :
                                      project.Status === ProjectStatus.InProgress ? faCode :
                                        project.Status === ProjectStatus.Planned ? faBrain :
                                          project.Status === ProjectStatus.OnHold ? faStopCircle :
                                            faCode}
                                    title={project.Status}
                                />
                            </div>
                        </div>
                        <div>
                            <h3>{project.Title}</h3>
                            <p>{project.Description}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </Section>
  );
}
