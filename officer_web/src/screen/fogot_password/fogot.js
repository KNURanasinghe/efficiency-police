import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './fogot.css';

const Forgot = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: ''
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
            formData1.append('email', formData.email)

            const response = await axios.post('forgotPassword api link', formData1,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);

            setFormData({
                email: ''
            });

            navigate('/')

        } catch (error) {
            console.error('forgot password Error', error)
        }
    }

  return (
    <div className='fogot'>
        <div className='text-container'>
                <h1>Forgot Your Password?</h1>
                <p>No worries, we’ll help you reset it.</p>
                <p>Enter your email address below, and we’ll send you a link to reset your password. Follow the instructions in the email to regain access to your account.</p>
            
        </div>
        <div className='main-cont-fogot'>
       <div className='sec-fog'>
       <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
            <div className='fogot-form'>
                <label htmlFor='email' >email</label>
                <input type='text' id='email' name='email' value={FormData.email} onChange={handleChange} required></input>
            </div>
            <button type='submit'>Submit</button>
        </form>
       </div>
      
    </div>
    </div>
  )
}

export default Forgot
