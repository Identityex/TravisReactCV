import './App.css';
import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Lazy load all route components
const Layout = React.lazy(() => import('./pages/layout.tsx'));
const Home = React.lazy(() => import('./pages/home.tsx').then(module => ({ default: module.Home })));
const NoPage = React.lazy(() => import('./pages/no-page.tsx').then(module => ({ default: module.NoPage })));
const Changelog = React.lazy(() => import('./pages/changelog.tsx').then(module => ({ default: module.Changelog })));
const Project = React.lazy(() => import('./pages/project.tsx').then(module => ({ default: module.Project })));

// Import loader separately as it's needed for route configuration
import { loader } from './utils/projectLoader.ts';
import { Loading } from './components/loading/loading.tsx';

function App() {

  const RoutesJSX = (
      <>
          <Route path="projects/*" element={
            <Suspense fallback={<Loading />}>
              <Layout/>
            </Suspense>
          }>
            <Route path={':projectSlug'} element={
              <Suspense fallback={<Loading />}>
                <Project />
              </Suspense>
            } loader={loader}/>
          </Route>
          <Route path="/" element={
            <Suspense fallback={<Loading />}>
              <Layout/>
            </Suspense>
          }>
              <Route index element={
                <Suspense fallback={<Loading />}>
                  <Home/>
                </Suspense>
              }/>
              <Route path="changelog" element={
                <Suspense fallback={<Loading />}>
                  <Changelog />
                </Suspense>
              } />
              <Route path="*" element={
                <Suspense fallback={<Loading />}>
                  <NoPage/>
                </Suspense>
              }/>
          </Route>
      </>
  );

  const routes = createRoutesFromElements(RoutesJSX);

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
