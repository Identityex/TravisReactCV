import { Section } from '../section/Section.tsx';
import { ReactElement, useEffect, useState } from 'react';
import projectsJson from './projects.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import styles from './projects.module.scss';
import './projects-global.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faCircleCheck, faCode, faStopCircle } from '@fortawesome/free-solid-svg-icons';

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
  Video: string | null;
  Status: ProjectStatus;
  Url: string | null;
}

export function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    setProjects(projectsJson.data as ProjectData[]);
  }, []);

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
                renderThumbs={(children) => children.map((project) => (
                    <div>
                        {(project as ReactElement).props.children[0].props.children.props.children[0]}
                    </div>
                ))}
            >
                {projects.map((project) => (
                    <div key={project.id}>
                        <div className={`${styles.projectImage}`} onClick={() => project.Url && window.open(project.Url, '_blank')}>
                            <div className={styles.projectImageOverlay}>
                                <img className={'project-image'} src={project.Gif} alt={project.Title}/>
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
