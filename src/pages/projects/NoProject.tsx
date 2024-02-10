export function NoProjectPage() {
  // Get project name from URL
  const projectName = window.location.pathname.split('/')[2];


  return (
        <div>
            <h1>No page has been created for {projectName} yet.</h1>
            <p>Check back later.</p>
        </div>
  );
}