import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ContentHeader from "../components/ContentHeader";
import { FaEdit } from "react-icons/fa";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    itemCategory: "",
    itemQuantity: "",
    unitPrice: "",
    totalValue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    // Automatically calculate totalValue if quantity and price are set
    if (
      name === "itemQuantity" ||
      name === "unitPrice"
    ) {
      const quantity = parseFloat(
        name === "itemQuantity" ? value : updatedFormData.itemQuantity
      );
      const price = parseFloat(
        name === "unitPrice" ? value : updatedFormData.unitPrice
      );

      if (!isNaN(quantity) && !isNaN(price)) {
        updatedFormData.totalValue = (quantity * price).toFixed(2);
      }
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/inventory/addInventory",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Inventory item added successfully");

      // Reset form
      setFormData({
        itemName: "",
        itemCategory: "",
        itemQuantity: "",
        unitPrice: "",
        totalValue: "",
      });

      // Refresh inventory list
      fetchInventory();
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await axios.get(
        "http://localhost:8000/api/inventory/allInventory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInventory(res.data);
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="container py-4">
      <ContentHeader />

      <div className="card my-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Add New Inventory Item</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  className="form-control"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  name="itemCategory"
                  className="form-control"
                  value={formData.itemCategory}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  name="itemQuantity"
                  className="form-control"
                  value={formData.itemQuantity}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Unit Price ($)</label>
                <input
                  type="number"
                  name="unitPrice"
                  className="form-control"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Total Value ($)</label>
                <input
                  type="number"
                  name="totalValue"
                  className="form-control"
                  value={formData.totalValue}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  readOnly
                />
              </div>
            </div>

            <div className="mt-4 text-end">
              <button type="submit" className="btn btn-success">
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>

      <h2 className="mb-3">All Inventory</h2>
      {inventory.length === 0 ? (
        <div className="alert alert-warning">No inventory available.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Value</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemCategory}</td>
                  <td>{item.itemQuantity}</td>
                  <td>${parseFloat(item.unitPrice).toFixed(2)}</td>
                  <td>${parseFloat(item.totalValue).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryList;
