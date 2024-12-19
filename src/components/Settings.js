import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './styles/Settings.css';

const Settings = ({server}) => {
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');
    const [database, setDatabase] = useState('');
    const [username, setUsername] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${server}/connect`)
            .then(data => {
                setAlertMessage('Connected to the PostgreSQL database successfully');
                setAlertType('success');
            })
            .catch(error => {
                console.error(error);
                setAlertMessage('Failed to connect to the PostgreSQL database');
                setAlertType('danger');
            });
    }, []);

    useEffect(() => {
        fetch(`${server}/db-details`)
            .then(response => response.json())
            .then(data => {
                setHost(data.host);
                setPort(data.port);
                setDatabase(data.database);
                setUsername(data.user);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching database details:', error);
                setAlertMessage('Error fetching database details');
                setAlertType('danger');
                setLoading(false);
            });
    }, []);

    const handleSave = () => {
        if (!host || !port || !database || !username) {
            setAlertMessage('Please fill in all fields.');
            setAlertType('danger');
        } else {
            // Send save request to the server
            setAlertMessage('Settings saved successfully!');
            setAlertType('success');
        }
    };

    const handleTestConnection = () => {
        fetch(`${server}/test-connection`, {
            method: 'POST',
            body: JSON.stringify({ host, port, database, username }),
        })
        .then(response => {
            if (response.ok) {
                setAlertMessage('Connection successful!');
                setAlertType('success');
            } else {
                setAlertMessage('Connection failed.');
                setAlertType('danger');
            }
        })
        .catch(error => {
            setAlertMessage('Error testing connection.');
            setAlertType('danger');
        });
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container mt-5">
                {alertMessage && (
                    <div className={`alert alert-${alertType}`} role="alert">
                        {alertMessage}
                    </div>
                )}
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="card">
                        <div className="card-header">
                            PostgreSQL Settings
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="host" className="form-label">Host</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="host"
                                        placeholder="NA"
                                        value={host}
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="port" className="form-label">Port</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="port"
                                        placeholder="NA"
                                        value={port}
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="database" className="form-label">Database</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="database"
                                        placeholder="NA"
                                        value={database}
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="NA"
                                        value={username}
                                        required
                                        readOnly
                                    />
                                </div>
                            </form>
                            
                            <button className="btn btn-primary mt-3" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
