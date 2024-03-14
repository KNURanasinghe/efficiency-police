// HomePage.js

import React from 'react';
import './home.css'
function HomePage() {
    
    return (
        <div className="cont">
             <div className="buttons">
                <button className="insertButton">Insert</button>
                <button className="updateButton">Update</button>
            </div>
            <div className="container">
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            {/* Add more table headers if needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render table rows dynamically based on data from backend */}
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>30</td>
                            {/* Add more table cells if needed */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HomePage;
