import { Router } from "express";
import { controllers } from "../../../controllers";

const auth = Router();

auth.post("/register", controllers.v1.auth.register);

export default auth;