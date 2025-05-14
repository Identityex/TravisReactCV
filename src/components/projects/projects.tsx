import { Section } from '../section/Section.tsx';
import { SkillTypes } from '../skills/skills.tsx';
import { ReactElement, useEffect, useState } from 'react';
import projectsJson from './projects.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import styles from './projects.module.css';
import './projects-global.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faCircleCheck, faCode, faStopCircle } from '@fortawesome/free-solid-svg-icons';

import { Cloudinary } from '@cloudinary/url-gen';

// Import the responsive plugin
import { AdvancedImage, AdvancedVideo, responsive } from '@cloudinary/react';

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
  Categories: string[];
  Skills: string[];
}

interface ProjectsProps {
  skills: string[];
}

export function Projects(props: ProjectsProps) {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    // Sort by id
    const projectsData = (projectsJson.data as ProjectData[])
      .sort((a, b) => a.id.localeCompare(b.id));

    if (props.skills.length > 0) {
      // First try to filter by description text matching the skill names
      const filteredBySkills = projectsData.filter((project) => {
        return props.skills.some((skill) => 
          project.Description.toLowerCase().includes(skill.toLowerCase()) || project.Skills.some((pSkill) => pSkill.toLowerCase() === skill.toLowerCase()),
        );
      });

      console.log(`Filtered by skills: ${filteredBySkills.length}`);
      
      // If we find matches based on skills in description, use those
      // Otherwise, fall back to category matching
      if (filteredBySkills.length > 0) {
        setProjects(filteredBySkills);
      } else {
        // Get categories from the selected skills using the SkillTypes
        const skillToCategory = new Map();
        Object.entries(SkillTypes).forEach(([key, value]) => {
          skillToCategory.set(value, value);
        });
        
        // Try to match by categories
        const filteredByCategories = projectsData.filter((project) => {
          return props.skills.some((skill) => {
            // Check if any of the project's categories match the category of this skill
            if (project.Categories) {
              for (const category of project.Categories) {
                if (category.toLowerCase().includes(skill.toLowerCase()) || 
                    skill.toLowerCase().includes(category.toLowerCase())) {
                  return true;
                }
              }
            }
            return false;
          });
        });
        
        setProjects(filteredByCategories.length > 0 ? filteredByCategories : projectsData);  
      }
    } else {
      setProjects(projectsData);
    }
  }, [props.skills]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'idx-studios',
    },
  });

  return (
        <Section sectionId={'Projects'}>
            <h1>Projects</h1>
            <Carousel
                selectedItem={0}
                emulateTouch={true}
                className={`${styles.projects}`}
                showIndicators={false}
                useKeyboardArrows={true}
                showStatus={false}
                // renderItem={(children) => children}
                renderThumbs={(children) => children.map((project) => (
                    <div className={styles.thumbnail}>
                      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                      { (project as ReactElement).props.children[0].props.children.props.children[0] }
                    </div>
                ))}
            >
                {projects.map((project) => {

                  console.log(project);

                  const url = project.cloudinaryImage ? cld.image(project.cloudinaryImage).toURL() : 'project.Gif';
                  console.log(url);
                  return (
                    <div key={project.id}>
                        <div className={`${styles.projectImage}`} onClick={() => project.Url && window.open(project.Url, '_blank')}>
                            <div className={styles.projectImageOverlay}>
                                {project.Video ?
                                    // Should use video if available
                                    <AdvancedVideo
                                        cldVid={cld.video(project.Video)}
                                        autoPlay={true}
                                        muted={true}
                                        loop={true}
                                        playsInline={true}
                                        className={styles.projectImage} /> :
                                  project.cloudinaryImage ?
                                    <AdvancedImage
                                    cldImg={cld.image(project.cloudinaryImage)}
                                    // plugins={[responsive({ steps: 200 })]}
                                    alt={project.Title}
                                    className={styles.projectImage}
                                />
                                    : <img src={project.Gif} alt={project.Title} />}
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
                  );
                })}
            </Carousel>
        </Section>
  );
}
