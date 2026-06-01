import { Router } from "express";

const test = Router();

test.use("/", (req, res) => {
    res.send("Hello, World! ");
});

export default test;