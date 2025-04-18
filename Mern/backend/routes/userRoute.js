import express from "express"

import {createTask, deleteUser, getAllTask, getUserByID, updateUser} from "../controller/userController.js"


const route = express.Router();

route.post("/addtask", createTask) // create user
route.get("/alltask", getAllTask) // Get all user
route.get("/user/:id", getUserByID) // Get user having ID
route.put("/user/update/:id", updateUser) // Update user having ID
route.delete("/delete/user/:id", deleteUser); // delete the data

export default route;