import { Router } from "express";
import { controllers } from "../../../controllers";

const auth = Router();

auth.post("/register", controllers.v1.auth.register);
auth.post("/login", controllers.v1.auth.login);
auth.post("/logout", controllers.v1.auth.logout);
auth.get("/refresh", controllers.v1.auth.refresh);

export default auth;