import './App.css';
import { Home } from './pages/home.tsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './pages/layout.tsx';
import { NoPage } from './pages/no-page.tsx';
import { Changelog } from './pages/changelog.tsx';
import { loader, Project } from './pages/project.tsx';

function App() {

  const RoutesJSX = (
      <>
          <Route path="projects/*" element={<Layout/>}>
            <Route path={':projectSlug'} element={<Project />} loader={loader}/>
          </Route>
          <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="changelog" element={<Changelog />} />
              <Route path="*" element={<NoPage/>}/>
          </Route>
      </>
  );

  const routes = createRoutesFromElements(RoutesJSX);

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
