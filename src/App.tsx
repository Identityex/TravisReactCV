import './App.css';
import { Home } from './pages/home.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout.tsx';
import { NoPage } from './pages/no-page.tsx';

function App() {

  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
