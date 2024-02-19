import { ProjectStatus } from '../components/projects/projects.tsx';
import { ChangelogItem } from './changelog.tsx';
import { Params, useLoaderData } from 'react-router-dom';
import { NoProjectPage } from './projects/NoProject.tsx';

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
  // load data from ../assets/project-data.json
  const data = await import('../assets/project-details.json');

  console.log(data);
  console.log(params.projectSlug);
  console.log(data.projects.find((p) => p.slug === params.projectSlug) as ProjectData);
  // Find the project by the id and return it
  return { projectData: data.projects.find((p) => p.slug === params.projectSlug) };
}


export function Project() {
  const { projectData } = useLoaderData() as { projectData: ProjectData };
  if (!projectData) {
    return <NoProjectPage/>;
  }


  return (
    <div>
      <h1>{projectData?.title}</h1>
      <p>{projectData?.description}</p>
    </div>
  );
}
