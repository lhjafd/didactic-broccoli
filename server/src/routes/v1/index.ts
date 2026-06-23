import { Router } from "express";
import test from "./test";
import dummy from "./dummy";
import auth from "./auth";

const v1 = Router();

v1.use("/test", test);
v1.use("/auth", auth);

v1.use("/dummy", dummy);

export default v1;