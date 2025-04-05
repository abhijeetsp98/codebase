import express from "express"

import {create, deleteUser, getAllUsers, getUserByID, updateUser} from "../controller/userController.js"


const route = express.Router();

route.post("/user", create) // create user
route.get("/users", getAllUsers) // Get all user
route.get("/user/:id", getUserByID) // Get user having ID
route.put("/user/update/:id", updateUser) // Update user having ID
route.delete("/user/delete/:id", deleteUser) // delete the data

export default route;