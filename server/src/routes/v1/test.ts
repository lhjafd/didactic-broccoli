import { Router } from "express";
import jsonHandler from "../../middleware/jsonhandler";

const test = Router();

test.get("/", (req, res) => {
    res.send("Hello, World! ");
});

test.post("/jsontest", jsonHandler((req, res) => {
    res.json({recived: req.body});
}));

export default test;