// ClearancePage.js

import React, { useState, useEffect } from 'react';
import './onlinecomplain.css';

function ClearancePage() {
    const [requests, setRequests] = useState([]);

    /* useEffect(() => {
        fetch('/api/requests')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setRequests(data))
            .catch(error => console.error('Error fetching requests:', error));
    }, []);*/

    const handleApprove = requestId => {
        // Send request to API to approve the clearance request with the given ID
        // Example fetch:
      /*  fetch(`/api/requests/${requestId}/approve`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'approved' }) // Update status to 'approved'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Update local state to reflect the change
            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request.id === requestId ? { ...request, status: 'approved' } : request
                )
            );
        })
        .catch(error => console.error('Error approving request:', error));*/
    };

    const handleDisapprove = requestId => {
        // Send request to API to disapprove the clearance request with the given ID
        // Example fetch:
      /*  fetch(`/api/requests/${requestId}/disapprove`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'disapproved' }) // Update status to 'disapproved'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Update local state to reflect the change
            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request.id === requestId ? { ...request, status: 'disapproved' } : request
                )
            );
        })
        .catch(error => console.error('Error disapproving request:', error));*/
    }; 
const generateDemoData = () => {
        const demoData = [
            { id: 1, title: 'Demo Request 1', description: 'Description for Demo Request 1', requestedBy: 'John Doe', status: 'pending' },
            { id: 2, title: 'Demo Request 2', description: 'Description for Demo Request 2', requestedBy: 'Jane Smith', status: 'pending' },
            { id: 3, title: 'Demo Request 3', description: 'Description for Demo Request 3', requestedBy: 'Alice Johnson', status: 'approved' },
            { id: 3, title: 'Demo Request 3', description: 'Description for Demo Request 3', requestedBy: 'Alice Johnson', status: 'approved' },
            // Add more demo data as needed
        ];
        setRequests(demoData);
    };

    useEffect(() => {
        // Call the function to generate demo data
        generateDemoData();
    }, []);
    return (
        <div className="clearance-page">
        <div className="container">
            <h2>Online Complaints</h2>
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
                                <button className="approve">Approve</button>
                                <button className="disapprove">Disapprove</button>
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
