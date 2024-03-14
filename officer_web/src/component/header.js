// Header.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './header.css';
import Logo from '../asset/logo.png';

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <img src={Logo} alt="EfficencyXcel SL Logo" />
                </div>
                <div className="name">
                    EfficencyXcel SL
                </div>
                <nav>
                    <ul className="nav-items">
                        {/* Use Link component instead of anchor tags */}
                        <li><Link to="/">Home</Link><span className="notification-item" ></span></li>
                        <li><Link to="/clearancepage">Police Clearance</Link><span className="notification-item" ></span></li>
                        <li><Link to="/onlinecomplain">Online Complaints</Link><span className="notification-item" data-count="5"></span></li>
                        <li><Link to="/lostphone">Lost Mobiles</Link><span className="notification-item" data-count="2"></span></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
