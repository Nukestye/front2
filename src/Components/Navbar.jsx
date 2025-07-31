import React from 'react';

import { Link } from 'react-router-dom';

import './css/main.css';
import './css/navbar.css';

function Navbar() {

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className='header-title'>
                    <span className='prefix'>://</span>
                    <a href='https://www.gohar.dev/'>gohar</a>
                </div>
                <ul>
                    <li><Link className="navbar-items" to="/">Home</Link></li>
                    <li><Link className="navbar-items" to="/projects">Projects</Link></li>
                    <li><Link className="navbar-items" to="/blogs">Blog</Link></li>
                </ul>
            </div>
            <hr className='max-w'/>
        </nav>
    )
}

export default Navbar;
