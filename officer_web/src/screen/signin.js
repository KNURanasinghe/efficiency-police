import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './signin.css';

function SignIn() {
    const history = useHistory();

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
            const formData1 = new FormData();
            formData1.append('username', formData.username);
            formData1.append('password', formData.password);

            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', formData1, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Response:', response.data);

            setFormData({
                username: '',
                password: ''
            });

            // Redirect to the home page
            history.push('/');

        } catch (error) {
            console.error('Error:', error);
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
