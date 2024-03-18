import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.css';
import Logo from '../asset/logo.png';

import axios from 'axios';

function Header() {
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [criminalInfo, setCriminalInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notificationData, setNotificationData] = useState(null); // State to store notification count
    const token = localStorage.getItem('token');
    useEffect(() => {
        // Fetch notification details
        console.error(localStorage.getItem('token'));
        const fetchNotificationDetails = async () => {
            try {
                const response = await axios.post(
                    '/api/officer/get-alerts',
                    null,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                const { data } = response.data;
                setNotificationData(data);
            } catch (error) {
                console.error('Error fetching notification details:', error);
            }
        };
    
        // Call the function to fetch notification details
        fetchNotificationDetails();
    
        // Simulating an API call to check if a criminal is found
        const timeout = setTimeout(() => {
            if (notificationData) {
                const criminalData = {
                    name: notificationData[1],
                    location: notificationData[2],
                    time: notificationData[3]
                };
                
                setCriminalInfo(criminalData);
                setShowMessageBox(true); // Show the message box
            }
        }, 5000); // Simulating API call after 5 seconds
    
        // Clean up the timeout to avoid memory leaks
        return () => clearTimeout(timeout);
    }, []); // Run this effect only once when the component mounts



    const closeMessageBox = () => {
        setShowMessageBox(false);
    };

    const handleLogout = () => {
        // Perform logout logic
        setIsLoggedIn(false);
    };

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
                        <li><NavLink to="/">Home</NavLink><span className="notification-item"></span></li>
                        <li><NavLink to="/clearancepage">Police Clearance</NavLink><span className="notification-item"></span></li>
                        <li><NavLink to="/onlinecomplain">Online Complaints</NavLink><span className="notification-item" data-count="5"></span></li>
                        <li><NavLink to="/lostphone">Lost Mobiles</NavLink><span className="notification-item" data-count="2"></span></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <NavLink to="/signin">SignIn</NavLink>
                            <NavLink to="/signup">SignUp</NavLink>
                        </>
                    )}
                </div>
            </div>
            {showMessageBox && (
                <div className="message-box">
                    <button className="close-btn" onClick={closeMessageBox}>X</button>
                    <p>Criminal found!</p>
                    {criminalInfo && (
                        <div>
                            <p>Name: {criminalInfo.name}</p>
                            <p>Location: {criminalInfo.location}</p>
                            <p>Time: {criminalInfo.time}</p>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;
