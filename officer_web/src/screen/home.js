import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './home.css';

function HomePage() {
    const [data, setData] = useState([]);
    const [name1, setName1] = useState(''); // Declare name1 variable
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
                        'Authorization': 'Bearer ${token}'
                    }
                }
            );
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);

    const handleInsert = async () => {
        try {
            if (!token) {
                console.error('Token is null');
                return;
            }

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
            fetchData();
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!token) {
                console.error('Token is null');
                return;
            }

            const formData = new FormData();
            formData.append('name', name1); // Append the 'name' variable to the FormData object

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
            fetchData();
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
