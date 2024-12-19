import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InvoiceDetails = ({ data, disc, server }) => {
    const [groupedData, setGroupedData] = useState({});

    useEffect(() => {
        // Separate rows by max_tax_rate and calculate totals for each group
        const grouped = data.reduce((acc, item) => {
            const max_tax_rate = parseFloat(item.bil_tax_rate);
            const total_sale_amt = parseFloat(item.total_sale_amt);

            if (!acc[max_tax_rate]) {
                acc[max_tax_rate] = {
                    count: 0,
                    total_sale_amt: 0,
                    total_dis_amount: 0,
                    total_tco_amount: 0,
                    total_cgst_amount: 0,
                    total_sgst_amount: 0,
                    total_gst_amount: 0,
                    final_amount: 0,
                };
            }

            const discount_amount = total_sale_amt * (disc / 100);
            const tco_amount = total_sale_amt - discount_amount;
            const cgst_amount = tco_amount * (max_tax_rate / 100 / 2);
            const sgst_amount = tco_amount * (max_tax_rate / 100 / 2);
            const gst_amount = tco_amount * max_tax_rate / 100;
            const final_amount = tco_amount + gst_amount;

            acc[max_tax_rate].count += 1;
            acc[max_tax_rate].total_sale_amt += total_sale_amt;

            acc[max_tax_rate].total_dis_amount += parseFloat(discount_amount.toFixed(2));
            acc[max_tax_rate].total_tco_amount += parseFloat(tco_amount.toFixed(2));
            acc[max_tax_rate].total_cgst_amount += parseFloat(cgst_amount.toFixed(2));
            acc[max_tax_rate].total_sgst_amount += parseFloat(sgst_amount.toFixed(2));
            acc[max_tax_rate].total_gst_amount += parseFloat(gst_amount.toFixed(2));
            acc[max_tax_rate].final_amount += parseFloat(final_amount.toFixed(2));

            return acc;
        }, {});

        setGroupedData(grouped);
    }, [data, disc]);

    return (
        <table id="invoicesummarytable" className="table table-bordered">
            <thead>
                <tr>
                    <th>Tax</th>
                    <th>Particulars</th>
                    <th>Value</th>
                    <th>Discount</th>
                    <th>GST</th>
                    <th>Final Amount</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(groupedData).map((taxRate, index) => (
                    <tr key={index}>
                        <td>{taxRate}%</td>
                        <td>Medicines</td>
                        <td>{groupedData[taxRate].total_sale_amt.toFixed(2)}</td>
                        <td>{groupedData[taxRate].total_dis_amount.toFixed(2)}</td>
                        <td>{groupedData[taxRate].total_gst_amount.toFixed(2)}</td>
                        <td>{groupedData[taxRate].final_amount.toFixed(2)}</td>
                    </tr>
                ))}
                <tr id='total'>
                    <td colSpan={2}><strong>Totals</strong></td>
                    <td><strong>{Object.values(groupedData).reduce((sum, group) => sum + group.total_sale_amt, 0).toFixed(2)}</strong></td>
                    <td><strong>{Object.values(groupedData).reduce((sum, group) => sum + group.total_dis_amount, 0).toFixed(2)}</strong></td>
                    <td><strong>{Object.values(groupedData).reduce((sum, group) => sum + group.total_gst_amount, 0).toFixed(2)}</strong></td>
                    <td><strong>{Object.values(groupedData).reduce((sum, group) => sum + group.final_amount - 0.49, 0).toFixed(2)}</strong></td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <strong>
                            Number of DC(s): {
                                Object.values(groupedData)
                                    .filter((group, index, self) =>
                                        index === self.findIndex(g => g.id === group.id))  // filter duplicates
                                    .reduce((sum, group) => sum + group.count, 0)
                            }
                        </strong>
                    </td>

                    <td colSpan={4}>
                        <strong>GRAND TOTAL : {Object.values(groupedData).reduce((sum, group) => sum + group.final_amount - 0.49, 0).toFixed(2)}</strong>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default InvoiceDetails;