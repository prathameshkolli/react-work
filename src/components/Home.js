import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './styles/Home.css';

const Home = ({ server }) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [add1, setAdd1] = useState('');
  const [add2, setAdd2] = useState('');
  const [dl1, setDl1] = useState('');
  const [dl2, setDl2] = useState('');
  const [tin1, setTin1] = useState('');
  const [tin2, setTin2] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    fetch(`${server}/connect`)
      .then(() => {
        setAlertMessage('Connected to PostgreSQL successfully');
        setAlertType('success');
      })
      .catch((error) => {
        console.error(error);
        setAlertMessage('Failed to connect to PostgreSQL');
        setAlertType('danger');
      });
  }, [server]);

  useEffect(() => {
    fetch(`${server}/info`)
      .then((response) => response.json())
      .then((data) => {
        const user = data[0];
        setUsername(user.co_nm);
        setPhone(user.phone);
        setEmail(user.e_mail);
        setAdd1(user.addr1);
        setAdd2(user.addr2);
        setDl1(user.dl_1);
        setDl2(user.dl_2);
        setTin1(user.tin1);
        setTin2(user.tin2);
      })
      .catch((error) => {
        console.error(error);
        setAlertMessage(`Failed to retrieve data: ${error}`);
        setAlertType('danger');
      });
  }, [server]);

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />
      <div className="container mt-5">
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}

        {/* Profile Section */}
        <div className="card profile-card shadow-lg">
          <div className="card-header text-center">
            <h4>Welcome to Softmusk, {username}</h4>
            <img
              className="profile-img"
              src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" // Placeholder image
              alt="Profile"
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">Profile Information</h4>
            <p><strong >Phone:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Address:</strong> {add1}, {add2}</p>
            <p><strong>DL:</strong> {dl1} / {dl2}</p>
            <p><strong>TIN:</strong> {tin1} / {tin2}</p>
          </div>
        </div>

        {/* User Input */}
        <div className="card mt-4 shadow-lg">
          <div className="card-header">Quick Update</div>
          <div className="card-body">
            <form>
              <div className="form-group mb-3">
                <label>Enter New Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="New Address"
                />
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>

        {/* Recent Activities  */}
        <div className="card mt-4 shadow-lg">
          <div className="card-header" >Recent Activities</div>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                <span>Login from new device</span>
                <span className="text-muted">1 hour ago</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Password changed</span>
                <span className="text-muted">Yesterday</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Email verified</span>
                <span className="text-muted">2 days ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
