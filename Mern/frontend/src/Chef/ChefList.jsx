import React, { useEffect, useState } from "react";
import axios from "axios";
import ChefCard from "./ChefCard";
import ContentHeader from "../components/ContentHeader";

const ChefList = () => {
  const [allChef, setDishes] = useState([]);

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
        const res = await axios.get("http://localhost:8000/api/users/alluser", {
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
      <ChefCard/>

      <h2>All Chef List</h2>
      {allChef.length === 0 ? (
        <p>No dishes available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {allChef.map((dish) => (
            <li
              key={dish._id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>Chef : {dish.name}</h3>
              {/* <p>
                <strong>Description:</strong> {dish.description}
              </p>
              <p>
                <strong>Ingredients:</strong> {dish.ingredients?.join(", ")}
              </p>
              {dish.image && (
                <img
                  src={dish.image}
                  alt={dish.name}
                  style={{ maxWidth: "200px", borderRadius: "5px" }}
                />
              )}
              <br/> */}
              <button type="button" class="btn btn-info">Assign the task</button>
              <br></br>
              <button type="button" class="btn btn-success">Mark task as completed</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChefList;
