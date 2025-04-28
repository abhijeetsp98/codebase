import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentHeader from "../components/ContentHeader";
import TaskCard from "./TaskCard";


const TaskList = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const token = localStorage.getItem("token"); // Assumes the token is saved in localStorage after login

        // Check if token is available
        if (!token) {
          console.log("No token found");
          return;
        }

        // Send the token in the Authorization header
        const res = await axios.get("http://localhost:8000/api/tasks/alltask", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDishes(res.data);
      } catch (err) {
        console.error("Failed to fetch dishes:", err);
      }
    };

    fetchDishes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <ContentHeader />
      <TaskCard/>

      <h2>All Task</h2>
      {dishes.length === 0 ? (
        <p>No dishes available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {dishes.map((dish) => (
            <li
              key={dish._id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>{dish.dishId.name}</h3>
              <p>
                <strong>Assigned To:</strong> {dish.assignedTo.name}
              </p>
              <p>
                <strong>Assigned By:</strong> {(dish.assignedBy.name)}
              </p>
              <p>
                <strong>Priority:</strong> {(dish.assignedBy.name)}
              </p>
              <p>
                <strong>Status: </strong> {(dish.assignedBy.name)}
              </p>
              <p>
                <strong>Notes: </strong> {(dish.assignedBy.name)}
              </p>
              {dish.image && (
                <img
                  src={dish.image}
                  alt={dish.name}
                  style={{ maxWidth: "200px", borderRadius: "5px" }}
                />
              )}
              <br/>
              <button type="button" class="btn btn-info">Assign the task</button>
              <br></br>
              <button type="button" class="btn btn-success">Mark task as complete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
