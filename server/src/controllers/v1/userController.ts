import { Request, Response } from "express";
import * as userService from "../../services/userService";

export const register = (req: Request, res: Response) => {
    userService.register();
};