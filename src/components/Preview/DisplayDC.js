import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DC = ({ data }) => {
    const [groupedData, setGroupedData] = useState({});
    const [sortedData, setSortedData] = useState(data || []);
    const [sortOrder, setSortOrder] = useState('asc');

    // Function to compute the total of a specific column
    const computeColumnTotal = (column) => {
        return sortedData.reduce((total, item) => {
            const value = parseFloat(item[column]);
            return total + (isNaN(value) ? 0 : value);
        }, 0);
    };

    // Function to sort data by bil_dn_no
    const sortData = (column) => {
        const sorted = [...sortedData].sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setSortedData(sorted);
        setSortOrder(sortOrder === 'desc' ? 'desc' : 'asc');
    };

    return (
        <table id="previewtable" className="table table-bordered">
            <thead>
                <tr className="text-center">
                    <th>#</th>
                    <th onClick={() => sortData('bil_dn_no')}>DN No {sortOrder === 'asc' ? '▲' : '▼'}</th>
                    <th>Date</th>
                    <th>S Qty</th>
                    <th>MRP</th>
                    <th>Tax Rate</th>
                    <th>Discount</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {sortedData.map((item, index) => (
                    <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.bil_dn_no}</td>
                        <td>{item.bil_dn_dt}</td>
                        <td>{item.total_sqty}</td>
                        <td>{item.total_mrp}</td>
                        <td>{item.bil_tax_rate}</td>
                        <td>{item.total_disc_amt}</td>
                        <td>{item.total_sale_amt}</td>
                    </tr>
                ))}

                <tr>
                    <td colSpan={3}><strong>Total</strong></td>
                    <td><strong>{parseFloat(computeColumnTotal('total_sqty')).toFixed(2)}</strong></td>
                    <td><strong>{parseFloat(computeColumnTotal('total_mrp')).toFixed(2)}</strong></td>
                    <td></td>
                    <td><strong>{parseFloat(computeColumnTotal('total_disc_amt')).toFixed(2)}</strong></td>
                    <td><strong>{parseFloat(computeColumnTotal('total_sale_amt')).toFixed(2)}</strong></td>
                </tr>
            </tbody>
        </table>
    );
};

export default DC;