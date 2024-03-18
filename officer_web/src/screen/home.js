import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './home.css';

function HomePage() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            if (!token) {
                console.error('Token is null');
                return;
            }
    
            const response = await axios.post(
                'http://127.0.0.1:8000/api/officer/criminals',
                null,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData function when the component mounts
    }, []); // Run this effect only once when the component mounts

    const handleInsert = async () => {
        try {
            const formData = new FormData();
            const response = await axios.post(
                'http://127.0.0.1:8000/api/officer/add-criminal',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Insert response:', response.data);
            fetchData(); // Fetch updated data after successful insert
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            const response = await axios.post(
                'http://127.0.0.1:8000/api/officer/criminal-sightings',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Update response:', response.data);
            fetchData(); // Fetch updated data after successful update
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div className="cont">
            <div className="buttons">
                <button className="insertButton" onClick={handleInsert}>Insert</button>
                <button className="updateButton" onClick={handleUpdate}>Update</button>
            </div>
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Division</th>
                            <th>District</th>
                            <th>Description</th>
                            {/* Add more table headers if needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render table rows dynamically based on data from backend */}
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                                <td>{item[4]}</td>
                                <td>{item[5]}</td>
                                <td>{item[3]}</td>
                                {/* Add more table cells if needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HomePage;
