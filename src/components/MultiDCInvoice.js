import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './styles/MultiDCInvoice.css';
import { Table, Pagination, Modal, Loader } from 'rsuite';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';

const { Column, HeaderCell, Cell } = Table;

const MultiDCInvoice = ({ server }) => {
  const [username, setUsername] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [invoiceCustomer, setInvoiceCustomer] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [discount, setDiscount] = useState('');
  const [invoice, setInvoice] = useState('');

  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCount, setSelectedCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${server}/info`);
        const data = await response.json();
        setUsername(data[0].co_nm);
      } catch (error) {
        console.error(error);
        setAlertMessage('Failed to retrieve data from PostgreSQL database' + error);
        setAlertType('danger');
      }
    };

    fetchUserInfo();
  }, [server]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setInvoiceDate(today);
    setFromDate(today);
    setToDate(today);
  }, []);

  useEffect(() => {
    const connectToServer = async () => {
      try {
        await fetch(`${server}/connect`);
      } catch (error) {
        console.error(error);
        setAlertMessage('Failed to connect to the PostgreSQL database');
        setAlertType('danger');
      }
    };

    connectToServer();
  }, [server]);

  const handleGetDCs = () => {
    setLoading(true);
    const fromDateIncremented = new Date(fromDate);
    const toDateIncremented = new Date(toDate);

    const fromDateUTC = fromDateIncremented.toISOString();
    const toDateUTC = toDateIncremented.toISOString();

    const queryParams = new URLSearchParams({
      fromDate: fromDateUTC,
      toDate: toDateUTC,
    });

    fetch(`${server}/dc?${queryParams.toString()}`)
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => parseInt(a.bil_dn_no) - parseInt(b.bil_dn_no));
        setSelectedRows(sortedData.map((dc, index) => ({ ...dc, checked: false, index: index + 1 })));
        setFilteredRows(sortedData);
        setSelectedCount(0);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching DC:', error);
        setAlertMessage('Failed to retrieve DCs: ' + error);
        setAlertType('danger');
        setLoading(false);
      });
  };

  useEffect(() => {
    setFilteredRows(
      selectedRows.filter(row => row.bil_dn_no.toString().includes(searchTerm))
    );
  }, [searchTerm, selectedRows]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(selectedRows.map(row => ({ ...row, checked: newSelectAll })));
    setSelectedCount(newSelectAll ? selectedRows.length : 0);
  };

  const handleCheckboxChange = (rowData) => {
    const newSelectedRows = selectedRows.map(row => {
      if (row.index === rowData.index) {
        const newChecked = !row.checked;
        return { ...row, checked: newChecked };
      }
      return row;
    });

    const newSelectedCount = newSelectedRows.filter(row => row.checked).length;
    setSelectedRows(newSelectedRows);
    setSelectedCount(newSelectedCount);
  };

  const handleConvert = (event) => {
    event.preventDefault();
    const custom_data = selectedRows.filter(row => row.checked);
    if (custom_data && custom_data.length > 0) {
      navigate('/Preview', { state: { custom_data, discount, fromDate, toDate, selectedCount, invoice } });
    } else {
      alert('Please select at least one row for conversion.');
      setAlertMessage('Please select at least one row for conversion.');
      setAlertType('danger');
    }
  };

  const handleExportCSV = () => {
    const exportData = selectedRows.filter(row => row.checked);
    if (exportData.length > 0) {
      // CSV export logic 
    } else {
      alert('No rows selected for export.');
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="d-flex">
      <Sidebar />
      <div id="multidc" className="container mt-4">
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}

        <div className="card">
          <div className="card-header text-white bg-primary">
            Conversion of DC(s) to Sale Invoice
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="fromDate">From *</label>
                <input type="date" id="fromDate" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label htmlFor="toDate">To *</label>
                <input type="date" id="toDate" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
              </div>
            </div>

            <button className="btn btn-primary mb-3" onClick={handleGetDCs}>
              Get DC(s)
            </button>

            

            {loading && <Loader center />}

            <form onSubmit={handleConvert}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="invoiceCustomer">Customer *</label>
                  <select id="invoiceCustomer" className="form-select" value={invoiceCustomer} onChange={(e) => setInvoiceCustomer(e.target.value)}>
                    <option value={username}>{username}</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="invoiceDate">Date *</label>
                  <input type="date" id="invoiceDate" className="form-control" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} required />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-6">
                  <label>Override Applied Discount With New Discount of</label>
                  <input type="number" className="form-control" placeholder="%" value={discount} onChange={(e) => setDiscount(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label>Invoice Number</label>
                  <input type="number" className="form-control" placeholder="#" value={invoice} onChange={(e) => setInvoice(e.target.value)} required />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12">
                  <Table virtualized height={480} data={filteredRows}>
                    <Column align="center" fixed>
                      <HeaderCell>
                        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} /> Select All
                      </HeaderCell>
                      <Cell>
                        {rowData => (
                          <input
                            type="checkbox"
                            checked={rowData.checked}
                            onChange={() => handleCheckboxChange(rowData)}
                          />
                        )}
                      </Cell>
                    </Column>
                    <Column align="center" width={50} fixed>
                      <HeaderCell>Serial</HeaderCell>
                      <Cell dataKey="index" />
                    </Column>
                    <Column align="center" fixed>
                      <HeaderCell>DN No</HeaderCell>
                      <Cell dataKey="bil_dn_no" />
                    </Column>
                    <Column align="center" fixed>
                      <HeaderCell>Date</HeaderCell>
                      <Cell dataKey="bil_dn_dt" />
                    </Column>
                    <Column>
                      <HeaderCell>S Qty</HeaderCell>
                      <Cell dataKey="total_sqty" />
                    </Column>
                    <Column>
                      <HeaderCell>MRP</HeaderCell>
                      <Cell dataKey="total_mrp" />
                    </Column>
                    <Column>
                      <HeaderCell>Tax Rate</HeaderCell>
                      <Cell dataKey="bil_tax_rate" />
                    </Column>
                    <Column>
                      <HeaderCell>Discount</HeaderCell>
                      <Cell dataKey="total_disc_amt" />
                    </Column>
                    <Column>
                      <HeaderCell>Amount</HeaderCell>
                      <Cell dataKey="total_sale_amt" />
                    </Column>
                  </Table>
                </div>
              </div>
            <br></br>
            <div>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search by DN No"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button className="btn btn-info mb-3" onClick={handleExportCSV}>
              Export Selected as CSV
            </button>
            </div>

              <div className="row mt-3">
                <div className="col-12">
                  <p>{selectedCount} DC(s) selected</p>
                </div>
              </div>

              <button className="btn btn-success mt-3" type="submit">Convert</button>
            </form>
            


          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Confirm Conversion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to convert {selectedCount} DC(s) to Sale Invoice?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
          <button className="btn btn-success" onClick={handleConvert}>Confirm</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MultiDCInvoice;
