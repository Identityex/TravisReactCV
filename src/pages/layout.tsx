import { Outlet } from 'react-router-dom';
import { TopButton } from '../components/top-button/top-button.tsx';
import { Header } from '../components/header/header.tsx';

const Layout = () => {
  return (
        <>
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <Header />
            <TopButton/>
            <main id="main-content" role="main" style={{ 
                paddingTop: '80px',
            }}>
                <style>{`
                    @media (max-width: 768px) {
                        #main-content {
                            padding-top: 60px !important;
                        }
                    }
                `}</style>
                <Outlet/>
            </main>
        </>
  );
};

export default Layout;
