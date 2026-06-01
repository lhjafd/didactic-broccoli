import { Router } from "express";
import test from "./test";

const v1 = Router();

v1.use("/test", test);

export default v1;