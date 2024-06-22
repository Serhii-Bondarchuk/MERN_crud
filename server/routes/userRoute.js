import express from 'express';
import { create, deleteUser, getAllUsers, getUserById, update } from '../controller/userController.js';

const route = express.Router();

route.get("/users", getAllUsers)

route.get("/user/:id", getUserById)

route.delete("/delete/:id", deleteUser)

route.post("/create", create)

route.put("/update/user/:id", update)

export default route