import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './signup.css';

function SignUp() {

    const navigate = useNavigate();

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
            const formData1 = new FormData();
            formData1.append('username', formData.username);
            formData1.append('email', formData.email);
            formData1.append('password', formData.password);

            const response = await axios.post('http://127.0.0.1:8000/api/auth/register', formData1, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Response:', response.data);

            setFormData({
                username: '',
                email: '',
                password: ''
            });
            navigate('/');
            // Optionally, you can handle success behavior here, e.g., redirecting to another page
        } catch (error) {
            console.error('Error:', error);

            // Optionally, you can handle error behavior here, e.g., displaying an error message to the user
        }
    };

    return (
       <div className='signup'>
        <div className='text-container'>
        <h1>Welcome to EfficencyXcel SL</h1>
                <p>Are you a dedicated police officer looking to enhance your skills, connect with peers, and stay updated with the latest in law enforcement? You've come to the right place.</p>
                
                
                <h3>Join Our Network</h3>
                <p>Sign up today and become part of a thriving community dedicated to professional growth, support, and excellence in policing. Together, we can make a difference.</p>
                
                <p>Don't Miss Out!</p>
                <p>Register now to unlock your full potential and take advantage of all the resources we have to offer. Your journey towards enhanced skills and new opportunities starts here.</p>

               
        </div>
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
            <p>Already have an account? <Link to="/">SignIn</Link></p>
        </div>
       </div>
    );
}

export default SignUp;
