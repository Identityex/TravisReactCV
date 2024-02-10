import './App.css';
import { Home } from './pages/home.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout.tsx';
import { NoPage } from './pages/no-page.tsx';
import { Changelog } from './pages/changelog.tsx';
import { NoProjectPage } from './pages/projects/NoProject.tsx';

function App() {

  return (
        <BrowserRouter>
            <Routes>
                <Route path="projects/" element={<Layout/>}>
                    <Route path=":project" element={<NoProjectPage/>}/>
                </Route>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="changelog" element={<Changelog />} />
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
