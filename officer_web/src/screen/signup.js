// SignUp.js

import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './signup.css';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


const handleSubmit = async e => {
    e.preventDefault();
    try {
        // Create FormData object
        const formData1 = new FormData();
        formData.append('username', formData.username);
        formData.append('email', formData.email);
        formData.append('password', formData.password);

        // Make POST request to your API endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/auth/register', formData1, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
            }
        });

        console.log('Response:', response.data); // Log the response from the API

        // Reset form fields
        setFormData({
            username: '',
            email: '',
            password: ''
        });

        // Optionally, you can handle success behavior here, e.g., redirecting to another page
    } catch (error) {
        console.error('Error:', error); // Log any errors

        // Optionally, you can handle error behavior here, e.g., displaying an error message to the user
    }
};

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
