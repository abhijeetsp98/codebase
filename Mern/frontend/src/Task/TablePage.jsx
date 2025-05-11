import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TablePage = () => {
  const { id } = useParams();
  const [tableData, setTableData] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', price: 0 });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchTableData = async () => {
    try {
      const res = await axios.get(`/api/table/${id}`);
      setTableData(res.data);
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage('Error fetching table data.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOrder = async () => {
    try {
      await axios.post(`/api/table/${id}/order`, {
        items: [], // Start with empty item list
      });
      fetchTableData(); // Refresh data
    } catch (err) {
      console.error(err);
      setMessage('Failed to start order.');
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price) return;

    try {
      await axios.post(`/api/table/${id}/order`, {
        items: [newItem]
      });
      setNewItem({ name: '', price: 0 });
      fetchTableData(); // Refresh data
    } catch (err) {
      console.error(err);
      setMessage('Failed to add item.');
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post(`/api/table/${id}/checkout`);
      fetchTableData(); // Refresh data
    } catch (err) {
      console.error(err);
      setMessage('Checkout failed.');
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Table {tableData?.table_number}</h2>
      <p className="text-muted">{message}</p>

      {tableData?.order ? (
        <>
          <h4>Current Order</h4>
          <ul className="list-group mb-3">
            {tableData.order.items.map((item, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>

          <h5>Add New Item</h5>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
            />
            <button className="btn btn-success" onClick={handleAddItem}>
              Add
            </button>
          </div>

          <button className="btn btn-danger" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      ) : (
        <div>
          <p>No active order. Click below to start a new order.</p>
          <button className="btn btn-primary" onClick={handleStartOrder}>
            Start Order
          </button>
        </div>
      )}
    </div>
  );
};

export default TablePage;
