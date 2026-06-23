import { Request, Response } from "express";
import jsonHandler from "../../middleware/jsonhandler";
import * as authService from "../../services/authService";
import { RegisterSchema } from "../../types/input";
import { validate } from "../../middleware/vaildateZod";
import { ServiceError } from "../../util/serviceError";
import { httpStatusCodes } from "../../util/httpStatus";

export const register = jsonHandler(validate(RegisterSchema, 
async (req: Request, res: Response) => {
    const { username, nickname, password } = req.body;

    try {
        const requestedIP = req.ip;

        if (!requestedIP)
            throw new ServiceError("InternalServiceError", "cannot get ip address. ");

        const [userId, refreshToken, refreshTokenId] = await authService.register(username, nickname, password, requestedIP);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).send({ success: true, userId });
    } catch (e) {
        const err = e as ServiceError;
        res.status(httpStatusCodes[err.reason] || 400).send({success: false, error: {message: err.message}});
    };
}));