import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './onlinecomplain.css';

async function ClearancePage() {
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000//api/officer/get-all-complaints',{
                    headers: {
                      'Authorization': 'Bearer ${token}'
                    }}); // Replace '/api/requests' with your actual API endpoint
                setRequests(response.data); // Set the fetched data to the state variable
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();

        // Cleanup function to cancel any pending requests when the component unmounts
        return () => {};
    }, []); // Run this effect only once when the component mounts



 

    return (
        <div className="clearance-page">
            <div className="container">
                <h2>Online Complaints</h2>
                <div className="request-list-container">
                    <div className="request-list">
                        {requests.map(request => (
                            <div key={request[0]} className="request-item">
                                <h3>{request.title}</h3>
                                <div className="request-details">
                                    <p>Description: {request[4]}</p>
                                    <p>Requested by: {request[1]}</p>
                                    <p>Status: {request[5]}</p>
                                </div>
                               
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClearancePage;
