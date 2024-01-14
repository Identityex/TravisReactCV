import './App.css';
import { Home } from './pages/home.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout.tsx';
import { NoPage } from './pages/no-page.tsx';

function App() {

  return (
  // <>
  //   <div>
  //     <a href="https://vitejs.dev" target="_blank">
  //       <img src={viteLogo} className="logo" alt="Vite logo" />
  //     </a>
  //     <a href="https://react.dev" target="_blank">
  //       <img src={reactLogo} className="logo react" alt="React logo" />
  //     </a>
  //   </div>
  //   <h1>Vite + React</h1>
  //   <div className="card">
  //     <button onClick={() => setCount((count) => count + 1)}>
  //       count is {count}
  //     </button>
  //     <p>
  //       Edit <code>src/App.tsx</code> and save to test HMR
  //     </p>
  //   </div>
  //   <p className="read-the-docs">
  //     Click on the Vite and React logos to learn more
  //   </p>
  // </>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  {/*<Route path="blogs" element={<Blogs />} />*/}
                  {/*<Route path="contact" element={<Contact />} />*/}
                  <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
