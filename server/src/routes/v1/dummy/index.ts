import { Router } from "express";
import foods from "./foods";
import tags from "./tags";

const dummy = Router();

dummy.use("/foods", foods);
dummy.use("/tags", tags);

export default dummy;