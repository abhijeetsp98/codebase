import React, { useEffect, useState } from "react";
import axios from "axios";

const AllDishList = () => {
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await axios.get("http://localhost:8000/api/dish", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDishes(res.data);
    } catch (err) {
      console.error("Failed to fetch dishes:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/dish",
        {
          ...formData,
          ingredients: formData.ingredients.split(",").map((item) => item.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Dish added successfully!");
      setFormData({ name: "", description: "", ingredients: "", image: "" });
      fetchDishes(); // refresh list
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add dish");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm mb-4">
    <h3 className="text-center mb-4">Add Dish</h3>
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter dish name"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Ingredients (comma-separated)</label>
          <input
            type="text"
            name="ingredients"
            className="form-control"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="e.g. rice, chicken, spices"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          name="image"
          className="form-control"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          rows="3"
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Add Dish
        </button>
      </div>
    </form>

  {message && (
    <div className={`alert mt-3 ${message.includes("success") ? "alert-success" : "alert-danger"}`}>
      {message}
    </div>
  )}
</div>


      <h3 className="mb-3">All Dishes</h3>
      {dishes.length === 0 ? (
        <p>No dishes available.</p>
      ) : (
        <ul className="list-unstyled">
          {dishes.map((dish) => (
            <li
              key={dish._id}
              className="border rounded p-3 mb-3 shadow-sm"
            >
              <h4>{dish.name}</h4>
              <p><strong>Description:</strong> {dish.description}</p>
              <p><strong>Ingredients:</strong> {dish.ingredients?.join(", ")}</p>
              {dish.image && (
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="img-fluid rounded"
                  style={{ maxWidth: "200px" }}
                />
              )}
              <div className="mt-3">
                <button type="button" className="btn btn-info me-2">Assign the task</button>
                <button type="button" className="btn btn-success">Mark task as complete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllDishList;
