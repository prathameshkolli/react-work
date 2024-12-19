import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/PreviewPage.css';
import Header from './Preview/Header';
import InvoiceSummary from './Preview/InvoiceSummary';
import DC from './Preview/DisplayDC';
import InvoiceDetails from './Preview/InvoiceDetails';

const PreviewPage = ({ server }) => {
    const location = useLocation();
    const { custom_data, discount, fromDate, toDate, selectedCount, invoice } = location.state || {};
    const [sortedData, setSortedData] = useState(custom_data || []);

    useEffect(() => {
        setSortedData(custom_data || []);
    }, [custom_data]);

    return (
        <>
            <div className="invoice-container">
                <Header server={server} fromDate={fromDate} toDate={toDate} selectedCount={selectedCount} invoice={invoice} />
                <br />
                <h5>Invoice Summary From: {fromDate} To: {toDate}</h5>
                <InvoiceDetails data={sortedData} disc={discount} server={server} />
                <div>
                    <div class="row mb-2">
                        <div class="col-6"></div>
                        <div class="col-6 text-start"><p><strong>For SAMSKRUTHY PHARMA PRIVATE LIMITED</strong></p></div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-8"></div>
                        <div class="col-3 text-start" id='Signature'><p>Signature</p></div>
                    </div>
                </div>
                <div id='newFooter' className=''>
                    <div class="row justify-content-center text-align-center">
                        <div class="col-8" id='newLatest'>
                            <strong>Copyright © 2024</strong> <a href='#'>Softmusk Info Private Limited.</a> All rights reserved.
                        </div>
                    </div>
                </div></div>
        </>
    );
};

export default PreviewPage;