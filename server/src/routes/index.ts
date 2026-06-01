import { Router } from "express";
import v1Routes from "./v1/index";

const v1 = Router();
v1.use("/v1", v1Routes);

export default v1;