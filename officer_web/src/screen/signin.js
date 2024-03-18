import React, { useState } from 'react';
import axios from 'axios';

function SignInPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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

            // Optionally, you can handle success behavior here, e.g., redirecting to another page
        } catch (error) {
            console.error('Error:', error);
            // Optionally, you can handle error behavior here, e.g., displaying an error message to the user
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </label>
                <br />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignInPage;
