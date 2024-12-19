import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InvoiceSummary = ({ data, disc, server }) => {
    const [groupedData, setGroupedData] = useState({});

    useEffect(() => {
        // Separate rows by max_tax_rate and calculate totals for each group
        const grouped = data.reduce((acc, item) => {
            const max_tax_rate = parseFloat(item.bil_tax_rate);
            const total_sale_amt = parseFloat(item.total_sale_amt);
            if (!acc[max_tax_rate]) {
                acc[max_tax_rate] = {
                    total_sale_amt: 0,
                    total_dis_amount: 0,
                    total_tco_amount: 0,
                    total_cgst_amount: 0,
                    total_sgst_amount: 0,
                    final_amount: 0,
                };
            }
            acc[max_tax_rate].total_sale_amt += total_sale_amt;
            acc[max_tax_rate].total_dis_amount += total_sale_amt * disc / 100;
            acc[max_tax_rate].total_tco_amount += total_sale_amt - ( total_sale_amt * disc / 100 );
            const tco_amount = total_sale_amt - ( total_sale_amt * disc / 100 );
            acc[max_tax_rate].total_cgst_amount += tco_amount * (max_tax_rate / 100 / 2);
            acc[max_tax_rate].total_sgst_amount += tco_amount * (max_tax_rate / 100 / 2);
            acc[max_tax_rate].final_amount += (total_sale_amt - (total_sale_amt * disc / 100)) + (tco_amount * max_tax_rate / 100);
            return acc;
        }, {});

        setGroupedData(grouped);
    }, [data, disc]);

    return (
        <table id="invoicesummarytable" className="table table-bordered">
            <thead>
                <tr>
                    <th>Tax Rate</th>
                    <th>Total Amount</th>
                    <th>Discount ({disc}%)</th>
                    <th>TCO</th>
                    <th>CGST</th>
                    <th>SGST</th>
                    <th>Final Amount</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(groupedData).map((taxRate, index) => (
                    <tr key={index}>
                        <td>{taxRate}%</td>
                        <td>{groupedData[taxRate].total_sale_amt.toFixed(4)}</td>
                        <td>{groupedData[taxRate].total_dis_amount.toFixed(4)}</td>
                        <td>{groupedData[taxRate].total_tco_amount.toFixed(4)}</td>

                        <td>{groupedData[taxRate].total_cgst_amount.toFixed(4)}</td>
                        <td>{groupedData[taxRate].total_sgst_amount.toFixed(4)}</td>
                        <td>{groupedData[taxRate].final_amount.toFixed(4)}</td>
                    </tr>
                ))}
                <tr id='total'>
                    <td><strong>Totals</strong></td>
                    <td><strong>{Object.values(groupedData).reduce((sum, group) => sum + group.total_sale_amt, 0).toFixed(4)}</strong></td>
                    <td><strong>{Object.values(groupedData).reduce((sum, group) => sum + group.total_dis_amount, 0).toFixed(4)}</strong></td>
                    <td><strong>{Object.values(groupedData).reduce((sum, group) => sum + group.total_tco_amount, 0).toFixed(4)}</strong></td>
                    <td><strong>{Object.values(groupedData).reduce((sum, group) => sum + group.total_cgst_amount, 0).toFixed(4)}</strong></td>
                    <td><strong>{Object.values(groupedData).reduce((sum, group) => sum + group.total_sgst_amount, 0).toFixed(4)}</strong></td>
                    <td><strong>{Object.values(groupedData).reduce((sum, group) => sum + group.final_amount, 0).toFixed(4)}</strong></td>
                </tr>
                <tr>
                    <td colSpan={3}></td>
                    <td colSpan={4}>
                        <strong>GRAND TOTAL : {Object.values(groupedData).reduce((sum, group) => sum + group.final_amount, 0).toFixed(4)}</strong>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default InvoiceSummary;
