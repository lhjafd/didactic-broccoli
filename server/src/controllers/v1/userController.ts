import { Request, Response } from "express";
import jsonHandler from "../../middleware/jsonhandler";
import * as userService from "../../services/userService";
import { RegisterSchema } from "../../types/input";
import z from "zod";
import { validate } from "../../middleware/vaildateZod";
import { ServiceError } from "../../util/serviceError";
import { httpStatusCodes } from "../../util/httpStatus";

export const register = jsonHandler(validate(RegisterSchema, 
(req: Request, res: Response) => {
    const { username, nickname, password } = req.body;

    try {
        userService.register(username, nickname, password);

    } catch (e) {
        const err = e as ServiceError;
        res.status(httpStatusCodes[err.reason] || 400).send({success: false, error: {message: err.message}});
    };
}));