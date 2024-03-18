import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

import './home.css';

function HomePage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(); // Call fetchData function when the component mounts
    }, []); // Run this effect only once when the component mounts

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/officer/criminals'); // Replace the URL with your API endpoint
            setData(response.data); // Set the fetched data to the state variable
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInsert = async () => {
        try {
            // Make an Axios request to your insert API endpoint
            const response = await axios.post('http://127.0.0.1:8000/api/officer/add-criminal', { /* Insert data here */ });
            console.log('Insert response:', response.data);
            // Fetch updated data after successful insert
            fetchData();
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            // Make an Axios request to your update API endpoint
            const response = await axios.put(`http://127.0.0.1:8000/api/officer/criminal-sightings/${id}`, { /* Updated data here */ });
            console.log('Update response:', response.data);
            // Fetch updated data after successful update
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
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
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            {/* Add more table headers if needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render table rows dynamically based on data from backend */}
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
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
