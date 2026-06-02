import { Router } from "express";

const test = Router();

test.get("/", (req, res) => {
    res.send("Hello, World! ");
});

test.post("/jsontest", (req, res) => {
    if (req.headers["content-type"]?.toLowerCase() !== "application/json") {
        res.status(400).json({error: "Body is not a vaild json object. "});
        return;
    }

    res.json({recived: req.body});
})

export default test;