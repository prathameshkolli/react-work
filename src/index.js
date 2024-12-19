import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiDCInvoice from './components/MultiDCInvoice';
import Settings from './components/Settings';
import Home from './components/Home';
import ViewCustomer from './components/ViewCustomer';
import Help from './components/Help';
import { ConnectionProvider } from './components/ConnectionContext'; // Import the context provider
import PreviewPage from './components/PreviewPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const nodeServer = "http://localhost:5000";
root.render(
  <BrowserRouter>
    <ConnectionProvider> {/* Wrap routes with ConnectionProvider */}
      <Routes>
        <Route path="/" element={<Home server={nodeServer} />} />
        <Route path='/ViewCustomers' element={<ViewCustomer server={nodeServer} />} />
        <Route path="/ConvertDCs" element={<MultiDCInvoice server={nodeServer} />} />
        <Route path="/Preview" element={<PreviewPage server={nodeServer} />} />
        <Route path="/Settings" element={<Settings server={nodeServer} />} />
        <Route path="/Help" element={<Help />} />
      </Routes>
    </ConnectionProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
