import * as argon2 from "argon2";
import { define } from "../def/define";
import { db } from "../util/db";
import { randomString } from "../util/random";
import { ServiceError } from "../util/serviceError";
import { safeString } from "../util/safeString";
import { Prisma } from "../generated/prisma/client";

export async function getUserInfoFromUserId(userId: string) {
    return await db.user.findUnique({where: {id: userId}});
}

export async function getUsernameFromUserId(userId: string) {
    return await db.username.findFirst({where: {
        version: (await db.username.aggregate({_max: { version: true }, where: {userId}}))._max.version ?? 1
    }});
}

export async function getNicknameFromUserId(userId: string) {
    return await db.nickname.findFirst({where: {
        version: (await db.nickname.aggregate({_max: { version: true }, where: {userId}}))._max.version ?? 1
    }});
}

export async function getUserIdFromUsername(username: string): Promise<string | null> {
    // TODO: impl
    const usernames = await db.username.findMany({where: {username}});

    for (const user of usernames) {
        const userinfo = await getUserInfoFromUserId(user.userId);

        if (!userinfo) 
            continue;

        if (userinfo.removed_at)
            continue;

        return userinfo.id;
    }

    return null;
}

// returns userId
export async function createUser(username: string, nickname: string, password: string, trx?: Prisma.TransactionClient): Promise<string> {
    if (!/^[a-zA-Z0-9._-]+$/.test(username))
        throw new ServiceError("BadRequest", "wrong username");
    if ( !(define.MIN_USERNAME_LENGTH <= username.length && username.length <= define.MAX_USERNAME_LENGTH) )
        throw new ServiceError("BadRequest", "wrong username length");

    if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':",./<>?\\|~`]+$/.test(password))
        throw new ServiceError("BadRequest", "wrong password");
    if ( !(define.MIN_PASSWORD_LENGTH <= password.length && password.length <= define.MAX_PASSWORD_LENGTH) )
        throw new ServiceError("BadRequest", "wrong password length");

    const fixedNickname = safeString(nickname);

    if ( !(define.MIN_NICKNAME_LENGTH <= fixedNickname.length && fixedNickname.length <= define.MAX_NICKNAME_LENGTH) )
        throw new ServiceError("BadRequest", "wrong nickname length");

    // TODO: username 겹치는지 확인
    // if (await getUserIdFromUsername(username)) 
    //     throw new ServiceError("BadRequest", "username already taken");

    const hash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 65535,
        timeCost: 3,
        parallelism: 4
    });

    // TODO: insert db
    const prisma = trx ?? db;

    for (let i = 0; i < 10; i++) {
        const randomUserId = randomString(define.USER_ID_LENGTH);

        if (await getUserInfoFromUserId(randomUserId)) 
            continue;

        try {
            await prisma.$transaction(async (trx) => {
                await trx.user.create({data: {id: randomUserId, password: hash, created_at: new Date()}});
                await trx.username.create({data: {userId: randomUserId, username: username, created_at: new Date(), version: 1}});
                await trx.nickname.create({data: {userId: randomUserId, nickname: fixedNickname, created_at: new Date(), version: 1}});
            });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e?.code === 'P2002') {
                const target = e?.meta?.target as string[] | undefined;

                if (target?.includes('username'))
                    throw new ServiceError("BadRequest", "username already taken");
                
                continue; // id 충돌이면 재시도
            }

            throw e; // 오류 전파
        }

        return randomUserId;
    }

    throw new ServiceError("InternalServerError", "cannot register. please try again later. ");
}

export async function removeUser(userId: string, trx?: Prisma.TransactionClient) {
    const prisma = trx ?? db;

    
}