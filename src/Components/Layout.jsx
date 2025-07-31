import { Outlet } from "react-router-dom";

import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

import './css/main.css';
import './css/layout.css';

function Layout() {

    return (
        <div className="main-content max-h max-w m-auto">
            <Navbar />

            <Outlet />
            
            <Footer />
        </div>
    )
}

export default Layout;