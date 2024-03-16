// SignIn.js

import React, { useState } from 'react';
import axios from 'axios';
import './signin.css';

function SignIn() {
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

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('your_api_login_endpoint', formData);
            console.log('Response:', response.data);
            setFormData({
                username: '',
                password: ''
            });
            // Optionally, you can handle success behavior here, e.g., redirecting to another page
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
