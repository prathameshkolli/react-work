import React, { useState } from 'react';
import './styles/Help.css';
import Sidebar from './Sidebar';

const Help = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">
                        How to Connect to PostgreSQL
                    </div>
                    <div className="card-body">
                        {/* Search Bar */}
                        <div className="search-bar mb-4">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search Topics..." 
                                value={searchTerm} 
                                onChange={handleSearchChange} 
                            />
                        </div>

                        <h5 className="card-title">Basic Connection Information</h5>
                        <p className="card-text">
                            To connect to a PostgreSQL database, you need the following information:
                        </p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Server (Host):</strong> The address of the database server, e.g., <code>localhost</code> or an IP address.</li>
                            <li className="list-group-item"><strong>Port:</strong> The port number on which the database server is listening, usually <code>5432</code>.</li>
                            <li className="list-group-item"><strong>Database Name:</strong> The name of the database you want to connect to.</li>
                            <li className="list-group-item"><strong>Username:</strong> The username you will use to authenticate with the database.</li>
                            <li className="list-group-item"><strong>Password:</strong> The password associated with the username.</li>
                        </ul>

                        <h5 className="card-title mt-4">Follow-Up Information</h5>
                        <p className="card-text">
                            Once you have the connection information, you can use various tools and libraries to connect to PostgreSQL. Here are a few examples:
                        </p>
                        <ul>
                            <li>Using <code>psql</code> command-line tool:
                                <pre className="code-block">
                                    psql -h &lt;host&gt; -p &lt;port&gt; -U &lt;username&gt; -d &lt;database&gt;
                                </pre>
                            </li>
                            <li>Using a connection string:
                                <pre className="code-block">
                                    postgresql://&lt;username&gt;:&lt;password&gt;@&lt;host&gt;:&lt;port&gt;/&lt;database&gt;
                                </pre>
                            </li>
                        </ul>
                    </div>
                    {/* Footer for external resources */}
                    <div className="card-footer">
                        <a href="https://www.postgresql.org/docs/" target="_blank" className="btn btn-info">PostgreSQL Documentation</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
