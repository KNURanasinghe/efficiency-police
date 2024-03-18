import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import axios from 'axios';
import './signin.css';

function SignIn() {
    const history = useHistory(); // Initialize useHistory hook

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Create FormData object
            const formData1 = new FormData();
            formData1.append('username', formData.username);
            formData1.append('password', formData.password);

            // Make POST request to the login endpoint
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', formData1, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
                }
            });

            console.log('Response:', response.data);

            // Clear the form fields after successful login
            setFormData({
                username: '',
                password: ''
            });

            // Navigate to the home page
            history.push('/');

            // Optionally, you can handle success behavior here, e.g., displaying a success message
        } catch (error) {
            console.error('Error:', error);
            // Optionally, you can handle error behavior here, e.g., displaying an error message to the user
        }
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;
