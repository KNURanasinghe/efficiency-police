import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

import './home.css';

function HomePage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.example.com/data'); // Replace the URL with your API endpoint
                setData(response.data); // Set the fetched data to the state variable
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();

        // Cleanup function to cancel any pending requests when the component unmounts
        return () => {};
    }, []); // Run this effect only once when the component mounts

    return (
        <div className="cont">
            <div className="buttons">
                <button className="insertButton">Insert</button>
                <button className="updateButton">Update</button>
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
