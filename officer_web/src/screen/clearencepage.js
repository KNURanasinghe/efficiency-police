import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './clearence.css';

function ClearancePage() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/officer/get-clearance-requests'); // Replace '/api/requests' with your actual API endpoint
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

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/officer/get-lost-item-reports'); // Replace '/api/requests' with your actual API endpoint
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

    const handleApprove = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/officer/approve-clearance-report', formData);
            console.log('Response:', response.data);
            setFormData({
                r_id: '',
                details: ''
            });
            // Optionally, you can handle success behavior here, e.g., redirecting to another page
        } catch (error) {
            console.error('Error:', error);
            // Optionally, you can handle error behavior here, e.g., displaying an error message to the user
        }
    };



    return (
        <div className="clearance-page">
            <div className="container">
                <h2>Clearance Requests</h2>
                <div className="request-list-container">
                    <div className="request-list">
                        {requests.map(request => (
                            <div key={request.id} className="request-item">
                                <h3>{request.title}</h3>
                                <div className="request-details">
                                    <p>Description: {request.description}</p>
                                    <p>Requested by: {request.requestedBy}</p>
                                    <p>Status: {request.status}</p>
                                </div>
                                <div className="request-buttons">
                                    <button className="approve" onClick={() => handleApprove(request.id)}>Approve</button>
                                    <button className="disapprove" onClick={() => handleDisapprove(request.id)}>Disapprove</button>
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
