import React, { useState } from "react";
import "./adduser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL

const AddTask = () => {
  const tasks = {
    "dishname": "",
    "ingredients": "",
    "chefname": "",
    "noofplates": "",
  };
  const [task, setTask] = useState(tasks);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setTask({ ...task, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/addtask", task)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" class="btn btn-secondary">
        <i class="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New Task</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="dishname">Dish Name:</label>
          <input
            type="text"
            id="dishname"
            onChange={inputHandler}
            name="dishname"
            autoComplete="off"
            placeholder="Enter Dish Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="ingredients">Ingredients:</label>
          <input
            type="text"
            id="ingredients"
            onChange={inputHandler}
            name="ingredients"
            autoComplete="off"
            placeholder="Enter All Ingredients"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="chefname">Chef Name:</label>
          <input
            type="text"
            id="chefname"
            onChange={inputHandler}
            name="chefname"
            autoComplete="off"
            placeholder="Enter Chef Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">No. of Plates:</label>
          <input
            type="text"
            id="address"
            onChange={inputHandler}
            name="noofplates"
            autoComplete="off"
            placeholder="Enter No. Plates"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;