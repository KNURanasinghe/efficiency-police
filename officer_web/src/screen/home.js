import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

import './home.css';

function HomePage() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetchData(); // Call fetchData function when the component mounts
    }, []); // Run this effect only once when the component mounts

    const fetchData = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/officer/criminals',{
                headers: {
                  'Authorization': 'Bearer ${token}'
                }}); // Replace the URL with your API endpoint
            setData(response.data); // Set the fetched data to the state variable
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInsert = async () => {
        try {
            // Make an Axios request to your insert API endpoint
            const response = await axios.post('http://127.0.0.1:8000/api/officer/add-criminal',{
                headers: {
                  'Authorization': 'Bearer ${token}'
                }});
            console.log('Insert response:', response.data);
            // Fetch updated data after successful insert
            fetchData();
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            // Make an Axios request to your insert API endpoint
            const response = await axios.post('http://127.0.0.1:8000//api/officer/criminal-sightings', {
                headers: {
                  'Authorization': 'Bearer ${token}'
                }});
            console.log('Update response:', response.data);
            // Fetch updated data after successful insert
            fetchData();
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    return (
        <div className="cont">
            <div className="buttons">
                <button className="insertButton" onClick={handleInsert}>Insert</button>
                <button className="updateButton" onClick={() => handleUpdate(id)}>Update</button>
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
