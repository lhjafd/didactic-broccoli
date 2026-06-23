import { Router } from "express";
import { controllers } from "../../controllers";

const users = Router();

users.post("/register", controllers.v1.auth.register);

export default users;