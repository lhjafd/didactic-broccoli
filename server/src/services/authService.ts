import { config } from "../util/config";
import * as userService from "./userService";
import * as jwt from "jsonwebtoken";
import { db } from "../util/db";
import { Prisma } from "../generated/prisma/client";
import { randomString } from "../util/random";
import { define } from "../define";
import { ServiceError } from "../util/serviceError";

// returns [refreshToken, refreshTokenId]
export async function generateJWTRefresh(userId: string, requestedIP: string, trx?: Prisma.TransactionClient): Promise<[string, string]> {
    const refreshToken = jwt.sign({userId, requestedIP}, config.jwtSecret, { expiresIn: '7d' });

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

            throw e; // 오류 전파
        }
        
        return [refreshToken, refreshTokenId];
    }
    
    throw new ServiceError("InternalServerError", "cannot generate refresh token. ");
}

// retunrs [userId, refreshToken, refreshTokenId]
export async function register(username: string, nickname: string, password: string, requestedIP: string): Promise<[string, string, string]> {
    return db.$transaction(async (trx) => {
        const userId = await userService.createUser(username, nickname, password, trx);
        const [refreshToken, refreshTokenId] = await generateJWTRefresh(userId, requestedIP, trx);

        return [userId, refreshToken, refreshTokenId];
    });
}