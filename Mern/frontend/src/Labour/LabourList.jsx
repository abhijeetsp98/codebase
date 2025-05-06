import React, { useEffect, useState } from "react";
import axios from "axios";
import LabourCard from "./LabourCard";
import toast from "react-hot-toast";
import ContentHeader from "../components/ContentHeader";
import { FaEdit } from "react-icons/fa";

const LabourList = () => {
  const [labours, setLabours] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    hourlyRate: "",
    hoursWorked: "",
    totalEarning: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/labour/addlabour", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Task created successfully");
      setFormData({
        name: "",
        role: "",
        hourlyRate: "",
        hoursWorked: "",
        totalEarning: "",
      });
    } catch (error) {
      toast.error("Task creation failed");
    }
  };

  useEffect(() => {
    const fetchLabours = async () => {
      try {
        const token = localStorage.getItem("token"); // Assumes the token is saved in localStorage after login

        // Check if token is available
        if (!token) {
          console.log("No token found");
          return;
        }

        // Send the token in the Authorization header
        const res = await axios.get("http://localhost:8000/api/labour/alllabour", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLabours(res.data);
      } catch (err) {
        console.error("Failed to fetch dishes:", err);
      }
    };

    fetchLabours();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <ContentHeader />
      <LabourCard/>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input  type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select a Role</option>
            <option value="Manager">Manager</option>
            <option value="Staff">Staff</option>
            <option value="Accountant">Accountant</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <div>
          <label>Hourly Rate: $</label>
          <input  type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} step="0.01" min="0" placeholder="Enter hourly rate (e.g., $12.50)" required />
        </div>

        <div>
          <label>Hours Worked: hr</label>
          <input  type="number" name="hoursWorked" value={formData.hoursWorked} onChange={handleChange} step="1" min="0" placeholder="Enter hours worked (e.g., 50)" required />
        </div>


        <div>
          <label>Total Amount Earned: $</label>
          <input  type="number" name="totalEarning" value={formData.totalEarning} onChange={handleChange} step="1" min="0" placeholder="Total ammount (e.g., 50)" required />
        </div>

        <button type="submit">Add User</button>
      </form>

      
      <h2>All Labour</h2>
      {labours.length === 0 ? (
        <p>No User available.</p>
      ) : (


        <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Role</th>
          <th>Hourly Rate</th>
          <th>Hours Worked</th>
          <th>Total Amount Earned</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {labours.map((labour, index) => (
          <tr key={labour._id} style={{ borderBottom: "1px solid #ccc" }}>
            <td>{index + 1}</td>
            <td>{labour.name}</td>
            <td>{labour.role}</td>
            <td>${parseFloat(labour.hourlyRate).toFixed(2)}</td>
            <td>{labour.hoursWorked}</td>
            <td>${parseFloat(labour.totalEarning).toFixed(2)}</td>
            <td>
              <button
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
                
              >
                <FaEdit />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

        
        

        // <ul style={{ listStyle: "none", padding: 0 }}>
        //   {labours.map((dish) => (
        //     <li
        //       key={dish._id}
        //       style={{
        //         border: "1px solid #ccc",
        //         marginBottom: "15px",
        //         padding: "10px",
        //         borderRadius: "5px",
        //       }}
        //     >
        //       <h3>Username : {dish.name}</h3>
        //       <p>
        //         <strong>Role:</strong> {dish.role}
        //       </p>
        //       <p>
        //         <strong>Email:</strong> {dish.email}
        //       </p>
        //     </li>
        //   ))}
        // </ul>
      )}
    </div>
  );
};

export default LabourList;
