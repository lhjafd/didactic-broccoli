import { Router } from "express";
import test from "./test";
import users from "./users";

const v1 = Router();

v1.use("/test", test);
v1.use("/users", users);

export default v1;