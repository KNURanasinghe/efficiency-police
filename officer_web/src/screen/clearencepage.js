import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './clearence.css';

function ClearancePage() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/requests'); // Replace '/api/requests' with your actual API endpoint
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

    const handleApprove = requestId => {
        // Send request to API to approve the clearance request with the given ID
        // Example axios request:
        /*
        axios.put(`/api/requests/${requestId}/approve`, { status: 'approved' })
            .then(response => {
                // Update local state to reflect the change
                setRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.id === requestId ? { ...request, status: 'approved' } : request
                    )
                );
            })
            .catch(error => console.error('Error approving request:', error));
        */
    };

    const handleDisapprove = requestId => {
        // Send request to API to disapprove the clearance request with the given ID
        // Example axios request:
        /*
        axios.put(`/api/requests/${requestId}/disapprove`, { status: 'disapproved' })
            .then(response => {
                // Update local state to reflect the change
                setRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.id === requestId ? { ...request, status: 'disapproved' } : request
                    )
                );
            })
            .catch(error => console.error('Error disapproving request:', error));
        */
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
