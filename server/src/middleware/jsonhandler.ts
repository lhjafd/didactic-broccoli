import { NextFunction, Request, Response } from "express";

const jsonHandler = (callback: (req: Request, res: Response) => any) => {
    return (req: Request, res: Response) => {
        if (req.headers["content-type"]?.toLowerCase() !== "application/json") {
            res.status(400).json({error: "Body is not a vaild json object. "});
            return;
        }

        return callback(req, res);
    };
};

export default jsonHandler;