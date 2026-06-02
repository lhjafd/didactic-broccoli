import { Router } from "express";
import * as userController from "../../controllers/v1/userController";

const users = Router();

users.post("/register", userController.register);

export default users;