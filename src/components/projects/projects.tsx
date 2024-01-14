import { Section } from '../section/Section.tsx';
import { ReactChild, useEffect, useState } from 'react';
import projectsJson from './projects.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './projects.module.scss';
import './projects-global.scss';

export interface ProjectData {
  id: string;
  Title: string;
  Description: string;
  Gif: string;
  Video: string;
  Status: string;
  Url: string;
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
                width={'80%'}
                className={`${styles.projects}`}
                showIndicators={false}
                showArrows={false}
                renderThumbs={() => projects.map((project) => (
                    <img key={project.id} src={project.Gif} alt={project.Title}/>
                ) as unknown as ReactChild)}
            >
                {projects.map((project) => (
                    <div key={project.id}>
                        <div className={`${styles.projectImage}`} onClick={() => window.open(project.Url, '_blank')}>
                            <img src={project.Gif} alt={project.Title} />
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
