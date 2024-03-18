import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './clearence.css';

function ClearancePage() {
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/officer/get-clearance-requests',
                    null, // Pass null as the second argument since we're not sending any data in this request
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchData();

        return () => {};
    }, []);

    const handleApprove = async (requestId) => {
        try {
            const formData = new FormData();
            formData.append('request_id', requestId);

            const response = await axios.post(
                'http://127.0.0.1:8000/api/officer/approve-clearance-report',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Response:', response.data);
            // Update requests or any other necessary action

        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    const handleDisapprove = async (requestId) => {
        try {
            const formData = new FormData();
            formData.append('request_id', requestId);

            const response = await axios.post(
                'http://127.0.0.1:8000/api/officer/disapprove-clearance-report',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Response:', response.data);
            // Update requests or any other necessary action

        } catch (error) {
            console.error('Error:', error);
            // Handle error
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
