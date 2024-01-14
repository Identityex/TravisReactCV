import { Outlet } from 'react-router-dom';
import { TopButton } from '../components/top-button/top-button.tsx';

const Layout = () => {
  return (
        <>
            {/*<nav>*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            <Link to="/">Home</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/blogs">Blogs</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/contact">Contact</Link>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</nav>*/}

            <TopButton/>
            <Outlet/>
        </>
  );
};

export default Layout;
