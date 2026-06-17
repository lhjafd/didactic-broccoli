import { Router, Request, Response } from "express";

const foods = Router();

foods.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        data: {
            
        }
    });
});

export default foods;