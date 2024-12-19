import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import SearchIcon from '@rsuite/icons/Search';
import PageIcon from '@rsuite/icons/Page';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';  // Importing icons from React Icons
import 'rsuite/dist/rsuite.min.css';
import './styles/Sidebar.css';
import logo from '../assets/images/logo2.png';

const Sidebar = () => {
  const [currentDateTime, setCurrentDate] = useState('');
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const date = new Date();
    const formattedDate = formatDate(date);
    setCurrentDate(formattedDate);
  }, []);

  const formatDate = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${dayOfWeek}, ${day}/${month}/${year}`;
  };

  // Determine the activeKey based on the current location
  const getActiveKey = (pathname) => {
    switch (pathname) {
      case '/':
        return '1';
      case '/ViewCustomers':
        return '2';
      case '/ConvertDCs':
        return '3';
      case '/Settings':
        return '4';
      case '/Help':
        return '5';
      default:
        return '1';
    }
  };

  const [activeKey, setActiveKey] = useState(getActiveKey(location.pathname));

  useEffect(() => {
    // Update activeKey whenever the location changes
    setActiveKey(getActiveKey(location.pathname));
  }, [location.pathname]);

  return (
    <div id="Sidenav">
      <Sidenav appearance="subtle">
        <Sidenav.Body>
          <img id="logo-img" src={logo} alt="Softmusk Logo" />
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<DashboardIcon />} as={NavLink} to="/">
              Home
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />} as={NavLink} to="/ViewCustomers">
              View Customer
            </Nav.Item>
            <Nav.Item eventKey="3" icon={<PageIcon />} as={NavLink} to="/ConvertDCs">
              Convert DC
            </Nav.Item>
            <Nav.Item eventKey="4" icon={<GearCircleIcon />} as={NavLink} to="/Settings">
              Settings
            </Nav.Item>
            <Nav.Item eventKey="5" icon={<SearchIcon />} as={NavLink} to="/Help">
              Help
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      
      {/* Date and Footer Section */}
      <div className="sidebar-footer">
        <p><b>{currentDateTime}</b></p>
        <hr />
        <div className="footer-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
        </div>
        <hr />
        <p>
          <strong>Copyright © 2024</strong><br />
          <a href='#'>Softmusk Info Private Limited.</a><br />
          All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
