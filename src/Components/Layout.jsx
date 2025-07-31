import { Outlet } from "react-router-dom";

import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

import './css/main.css';
import './css/layout.css';
import { useEffect } from "react";

function Layout() {

    const items = {
        'is_logged': 'no',
        'userId': 'null',
        'token': ''
    };


    useEffect(() => {

        for (let key in items) {
            localStorage.setItem(key, items[key]);
        }

        localStorage.setItem('is_logged', 'no');
    }, [])

    return (
        <div className="main-content max-h max-w m-auto">
            <Navbar />

            <Outlet />
            
            <Footer />
        </div>
    )
}

export default Layout;