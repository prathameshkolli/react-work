import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/logo.png';
import banner from '../../images/logo.jpg';

const Header = ({ server, fromDate, toDate, selectedCount, invoice }) => {

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
        fetch(`${server}/info`)
            .then(response => response.json())
            .then(data => {
                setUsername(data[0].co_nm);
                setPhone(data[0].phone);
                setEmail(data[0].e_mail);
                setAdd1(data[0].addr1);
                setAdd2(data[0].addr2);

                setDl1(data[0].dl_1);
                setDl2(data[0].dl_2);

                setTin1(data[0].tin1);
                setTin2(data[0].tin2);
            })
            .catch(error => {
                console.error(error);
                setAlertMessage('Failed to retrive data from PostgreSQL database' + error);
                setAlertType('danger');
            });
    }, []);

    // State to hold the current date and time
    const [dateTime, setDateTime] = useState(new Date());

    // Format date and time
    // Format date and time without seconds
    const formattedDateTime = dateTime.toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="invoice-header-container">
            <div className="row">
                <div className="col-12 text-center">
                    <img id="header-img" src={banner} alt="Example" className="img-fluid" />
                </div>
            </div>
            <div className="row mt-3">
            </div>

            <div class="row">
                <div class="text-center col invoice-info">
                    <h6>Tax Invoice</h6>
                </div>
            </div>
            <p>Invoice Number: {invoice}</p>
            <br/>
            <div class="row">
                <div class="col invoice-info">
                    <p><strong>From,</strong></p>
                    <p>{username}</p>
                    <p>{add1}, {add2}</p>
                    <p>Ph: {phone} </p>
                    <p>GSTN: {tin1}</p>
                    <p><span>EMAIL:</span> {email}</p>
                </div>

                <div class="col invoice-info">
                    <strong>To,</strong>
                    <p>THE HUTTI GOLD MINES COMPANY LIMITED</p>
                    <p>Hutti - 584115,</p>
                    <p>Raichur District,</p>
                    <p>Karnataka, India</p>
                    <p>GSTN: 29AABCT4338C1ZH</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
