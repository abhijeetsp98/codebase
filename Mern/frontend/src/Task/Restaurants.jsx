import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from '../components/ContentHeader';
import '../styles/content.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const statusColors = {
  vacant: 'border-success text-success bg-light',   // Green
  occupied: 'border-warning text-warning bg-light', // Yellow
};

const Restaurant = () => {
  const navigate = useNavigate();
  const [tableStatuses, setTableStatuses] = useState(Array(12).fill('vacant')); // default green

  useEffect(() => {
    const fetchTableStatuses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8000/api/table/tableStatus', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tableData = response.data; // this is an array of table objects

        // Get table numbers that are present in the response
        const activeTableNumbers = tableData.map(t => t.table_number);

        const updatedStatuses = Array(12).fill('vacant'); // default all to vacant (green)

        activeTableNumbers.forEach((tableNumber) => {
          if (tableNumber >= 1 && tableNumber <= 12) {
            updatedStatuses[tableNumber - 1] = 'occupied'; // mark as occupied (yellow)
          }
        });

        setTableStatuses(updatedStatuses);
      } catch (error) {
        console.error('Failed to fetch table statuses:', error);
      }
    };

    fetchTableStatuses();
  }, []);

  const handleCardClick = (tableNumber) => {
    navigate(`/table/${tableNumber}`);
  };

  const handleReportClick = () => {
    navigate('/alltask');
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Restaurant;
