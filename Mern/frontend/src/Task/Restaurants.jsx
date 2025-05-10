import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../components/ContentHeader';
import '../styles/content.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const statusColors = {
  vacant: 'border-success text-success bg-light',   // Green
  occupied: 'border-warning text-warning bg-light', // Orange
  reserved: 'border-danger text-danger bg-light',   // Red
};

const Restaurant = () => {
  const navigate = useNavigate();
  const [tableStatuses, setTableStatuses] = useState(
    Array(12).fill('vacant') // all tables start as vacant
  );

  const handleCardClick = (tableNumber) => {
    navigate('/addtask');
  };

  const handleReportClick = () => {
    navigate('/alltask'); // change this path to your actual target
  };

  const updateStatus = (index, newStatus) => {
    const updatedStatuses = [...tableStatuses];
    updatedStatuses[index] = newStatus;
    setTableStatuses(updatedStatuses);
  };

  return (
    <div className="container py-4">
      <ContentHeader />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Select a Table</h2>
        <button className="btn btn-primary" onClick={handleReportClick}>
          Back
        </button>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {tableStatuses.map((status, index) => {
          const tableNumber = index + 1;
          const statusClass = statusColors[status] || 'border-secondary';

          return (
            <div className="col" key={tableNumber}>
              <div
                className={`card text-center shadow-sm ${statusClass}`}
                style={{ cursor: 'pointer', minHeight: '150px' }}
                onClick={() => handleCardClick(tableNumber)}
              >
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="card-title">Table {tableNumber}</h5>
                  <p className="card-text text-capitalize">{status}</p>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => updateStatus(index, 'vacant')}
                >
                  Vacant
                </button>
                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => updateStatus(index, 'occupied')}
                >
                  Occupied
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => updateStatus(index, 'reserved')}
                >
                  Reserved
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Restaurant;
