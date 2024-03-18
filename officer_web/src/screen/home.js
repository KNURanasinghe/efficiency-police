import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './home.css';

function HomePage() {
    const [data, setData] = useState([]);
    const [id, setId] = useState('');
    const [name1, setName1] = useState('');
    const [age, setAge] = useState('');
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');
    const [description, setDescription] = useState('');
    const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
    const [formType, setFormType] = useState('insert'); // State to determine if the form is for insert or update
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            if (!token) {
                console.error('Token is null');
                return;
            }
            const response = await axios.post(
                'http://127.0.0.1:8000/api/officer/criminals',
                null,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);

    const handleInsert = () => {
        setShowForm(true);
        setFormType('insert');
    };

    const handleUpdate = (rowData) => {
        setId(rowData[0]);
        setName1(rowData[1]);
        setAge(rowData[2]);
        setDivision(rowData[4]);
        setDistrict(rowData[5]);
        setDescription(rowData[3]);
        setShowForm(true);
        setFormType('update');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('c_id', id);
            formData.append('name', name1);
            formData.append('age', age);
            formData.append('division', division);
            formData.append('district', district);
            formData.append('description', description);

            if (formType === 'insert') {
                // Perform insert operation
                await axios.post(
                    'http://127.0.0.1:8000/api/officer/add-criminal',
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
            } else if (formType === 'update') {
                // Perform update operation
                await axios.post(
                    'http://127.0.0.1:8000/api/officer/update-criminal-data',
                    { ...formData, id },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
            }

            // Reset form fields
            setId('');
            setName1('');
            setAge('');
            setDivision('');
            setDistrict('');
            setDescription('');

            // Hide the form
            setShowForm(false);

            // Refetch data
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="cont">
            <div className="buttons">
                <button className="insertButton" onClick={handleInsert}>Insert</button>
            </div>
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Division</th>
                            <th>District</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>{item[2]}</td>
                                <td>{item[4]}</td>
                                <td>{item[5]}</td>
                                <td>{item[3]}</td>
                                <td>
                                    <button onClick={() => handleUpdate(item)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showForm && (
                <div className="form-container">
                    <h2>{formType === 'insert' ? 'Insert Data' : 'Update Data'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" value={name1} onChange={(e) => setName1(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Age:</label>
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Division:</label>
                            <input type="text" value={division} onChange={(e) => setDivision(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>District:</label>
                            <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button type="submit">{formType === 'insert' ? 'Add' : 'Update'}</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default HomePage;
