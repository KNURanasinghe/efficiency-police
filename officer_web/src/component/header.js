import React, { useEffect, useState } from 'react';
import Logo from '../asset/logo.png';
import './header.css';

import axios from 'axios';

function Header() {
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [criminalInfo, setCriminalInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notificationData, setNotificationData] = useState(null); // State to store notification count
    const token = localStorage.getItem('token');
    useEffect(() => {
        // Fetch notification details
        console.log(localStorage.getItem('token'));
        const fetchNotificationDetails = async () => {
            console.log('header', token)
            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/officer/get-alerts',
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

    const handleLogout = async () => {
        try {
          await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          localStorage.removeItem('access_token'); // Clear access_token from localStorage
          setIsLoggedIn(false); // Update state to reflect logged-out status
        } catch (error) {
          console.error('Logout Error:', error);
        }
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
                
                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                           
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
