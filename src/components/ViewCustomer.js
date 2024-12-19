import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './styles/ViewCustomer.css';
import { Table, Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const { Column, HeaderCell, Cell } = Table;

const ViewCustomer = ({ server }) => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${server}/connect`)
      .then(() => {
        setAlertMessage('Connected to the PostgreSQL database successfully');
        setAlertType('success');
      })
      .catch((error) => {
        console.error(error);
        setAlertMessage('Failed to connect to the PostgreSQL database');
        setAlertType('danger');
      });
  }, [server]);

  useEffect(() => {
    fetch(`${server}/customers`)
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
        setLoading(false);
      });
  }, [server]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <h5>Customer List</h5>
          </div>
          <div className="card-body">
            {/* Loading Spinner */}
            {loading ? (
              <div className="text-center">
                <Loader size="lg" />
              </div>
            ) : (
              <Table virtualized height={500} data={customers} className="customer-table">
                <Column width={70} align="center" fixed>
                  <HeaderCell>Code</HeaderCell>
                  <Cell dataKey="code" />
                </Column>

                <Column width={200}>
                  <HeaderCell>Name</HeaderCell>
                  <Cell dataKey="name" />
                </Column>

                <Column width={100}>
                  <HeaderCell>Pin</HeaderCell>
                  <Cell dataKey="pin" />
                </Column>

                <Column width={150}>
                  <HeaderCell>Phone</HeaderCell>
                  <Cell dataKey="ph1" />
                </Column>

                <Column width={300}>
                  <HeaderCell>Address</HeaderCell>
                  <Cell dataKey="adr1" />
                </Column>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
