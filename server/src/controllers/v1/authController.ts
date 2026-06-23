import { Request, Response } from "express";
import jsonHandler from "../../middleware/jsonhandler";
import * as authService from "../../services/authService";
import { input } from "../../types/input";
import { validate } from "../../middleware/vaildateZod";
import { ServiceError } from "../../util/serviceError";
import { httpStatusCodes } from "../../util/httpStatus";

export const register = jsonHandler(validate(input.RegisterSchema, 
async (req: Request, res: Response) => {
    const { username, nickname, password } = req.body;

    try {
        const requestedIP = req.ip;

        if (!requestedIP)
            throw new ServiceError("InternalServiceError", "cannot get ip address. ");

        const userId = await authService.register(username, nickname, password);
        const [refreshToken, _] = await authService.generateJWTRefresh(userId, requestedIP);
        const accessToken = await authService.generateJWTAccess(refreshToken);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).send({ success: true, userId, accessToken });
        return;
    } catch (e) {
        const err = e as ServiceError;
        res.status(httpStatusCodes[err.reason] || 400).send({success: false, error: {message: err.message}});
        return;
    }
}));

export const login = jsonHandler(validate(input.LoginSchema, 
async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const userId = await authService.login(username, password);

        const requestedIP = req.ip;

        if (!requestedIP)
            throw new ServiceError("InternalServiceError", "cannot get ip address. ");

        const [refreshToken, _] = await authService.generateJWTRefresh(userId, requestedIP);
        const accessToken = await authService.generateJWTAccess(refreshToken);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).send({ success: true, userId, accessToken });
        return;
    } catch (e) {
        const err = e as ServiceError;
        res.status(httpStatusCodes[err.reason] || 400).send({success: false, error: {message: err.message}});
        return;
    }
}));

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (typeof(refreshToken) != "string") {
        res.status(400).send({success: false, error: {message: "wrong refresh token"}});
        return;
    }

    try {
        await authService.removeJWTRefresh(refreshToken);
    } catch (e) {
        const err = e as ServiceError;
        res.status(httpStatusCodes[err.reason] || 400).send({success: false, error: {message: err.message}});
        return;
    }

    res.clearCookie("refreshToken");
    res.status(200).send({success: true});
}

export const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (typeof(refreshToken) != "string") {
        res.status(400).send({success: false, error: {message: "wrong refresh token"}});
        return;
    }
       
    let accessToken;
    try {
        accessToken = await authService.generateJWTAccess(refreshToken);
    } catch (e) {
        const err = e as ServiceError;
        res.status(httpStatusCodes[err.reason] || 400).send({success: false, error: {message: err.message}});
        return;
    }
    
    res.status(201).send({success: true, accessToken});

    return;
}