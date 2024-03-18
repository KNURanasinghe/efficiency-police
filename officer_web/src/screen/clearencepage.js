import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './clearence.css';

function ClearancePage() {
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/officer/get-clearance-requests',{
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

    const handleApprove = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/officer/approve-clearance-report', formData,{
                headers: {
                  'Authorization': 'Bearer ${token}'
                }});
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

    const handleDisapprove = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/officer/disapprove-clearance-report', formData,{
                headers: {
                  'Authorization': 'Bearer ${token}'
                }});
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
                            <div key={request[0]} className="request-item">
                                
                                <div className="request-details">
                                    <p>Description: {request[4]}</p>
                                    <p>Requested by: {request[1]}</p>
                                    <p>Status: {request[5]}</p>
                                </div>
                                <div className="request-buttons">
                                    <button className="approve" onClick={() => handleApprove(request[0])}>Approve</button>
                                    <button className="disapprove" onClick={() => handleDisapprove(request[0])}>Disapprove</button>
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
