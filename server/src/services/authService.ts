import { config } from "../util/config";
import * as userService from "./userService";
import * as jwt from "jsonwebtoken";
import { db } from "../util/db";
import { Prisma } from "../generated/prisma/client";
import { randomString } from "../util/random";
import { define } from "../define";
import { ServiceError } from "../util/serviceError";
import * as types from "../types/jwt";
import * as argon2 from "argon2";

// returns [refreshToken, refreshTokenId]
export async function generateJWTRefresh(userId: string, requestedIP: string, trx?: Prisma.TransactionClient): Promise<[string, string]> {
    const refreshToken = jwt.sign({userId}, config.jwtSecret, { expiresIn: '7d' });

    const prisma = trx ?? db;

    for (let i = 0; i < 10; i++) {
        // random refreshToken table id 생성
        const refreshTokenId = randomString(define.REFRESH_TOKEN_ID_LENGTH);
        // db 삽입
        try {
            await prisma.refreshToken.create({data: {
                id: refreshTokenId, 
                userId, 
                token: refreshToken, 
                login_ip: requestedIP, 
                expire_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7d
            }});
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                continue; // id 충돌이면 재시도
            }

            console.warn(e);

            throw new ServiceError("InternalServerError", "something went wrong"); // 오류 전파
        }
        
        return [refreshToken, refreshTokenId];
    }
    
    throw new ServiceError("InternalServerError", "cannot generate refresh token. ");
}

export async function checkJWTRefresh(refreshToken: string): Promise<boolean> {
    let refreshTokenInfo;

    try {
        refreshTokenInfo = await db.refreshToken.findUnique({where: {token: refreshToken}});
    } catch (e) {
        console.warn(e);

        throw new ServiceError("InternalServerError", "cannot check refresh token");
    }

    return !!refreshTokenInfo;
}

export async function removeJWTRefresh(refreshToken: string) {
    try {
        await db.refreshToken.delete({where: {token: refreshToken}});
    } catch (e) {
        console.warn(e);

        throw new ServiceError("InternalServerError", "cannot remove refresh token");
    }
}

export async function generateJWTAccess(refreshToken: string): Promise<string> {
    let result;
    try {
        result = jwt.verify(refreshToken, config.jwtSecret) as types.RefreshTokenPayload;
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError)
            throw new ServiceError("Unauthorized", "the refresh token has been expired");

        throw new ServiceError("BadRequest", "wrong refresh token");
    }

    if (!(await checkJWTRefresh(refreshToken)))
        throw new ServiceError("Unauthorized", "the refresh token has been expired by server");

    const userId = result.userId;

    const username = (await userService.getUsernameFromUserId(userId))?.username;
    if (!username)
        throw new ServiceError("BadRequest", "the user does not exists. ");

    const nickname = (await userService.getNicknameFromUserId(userId))?.nickname;
    if (!nickname)
        throw new ServiceError("BadRequest", "the user does not exists. ");
    
    const accessToken = jwt.sign({userId, username, nickname}, config.jwtSecret, {expiresIn: '15m'});

    return accessToken;
}

export async function register(username: string, nickname: string, password: string): Promise<string> {
    return await userService.createUser(username, nickname, password);
}

// returns userId
export async function login(username: string, password: string): Promise<string> {
    if (!/^[a-zA-Z0-9._-]+$/.test(username))
        throw new ServiceError("BadRequest", "wrong username");
    if ( !(define.MIN_USERNAME_LENGTH <= username.length && username.length <= define.MAX_USERNAME_LENGTH) )
        throw new ServiceError("BadRequest", "wrong username length");

    const userId = await userService.getUserIdFromUsername(username);
    if (!userId)
        throw new ServiceError("BadRequest", "wrong username");

    if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':",./<>?\\|~`]+$/.test(password))
        throw new ServiceError("BadRequest", "wrong password");
    if ( !(define.MIN_PASSWORD_LENGTH <= password.length && password.length <= define.MAX_PASSWORD_LENGTH) )
        throw new ServiceError("BadRequest", "wrong password length");

    let userinfo;
    try {
        userinfo = await db.user.findFirstOrThrow({where: {id: userId}});
    } catch (e) {
        throw new ServiceError("BadRequest", "wrong username or password");
    }

    const isVaild = await argon2.verify(userinfo.password, password);
    if (!isVaild)
        throw new ServiceError("BadRequest", "wrong username or password");

    return userId;
}

setInterval(async () => {
  await db.refreshToken.deleteMany({
    where: { expire_at: { lt: new Date() } }
  });
}, 24 * 60 * 60 * 1000); // 1d