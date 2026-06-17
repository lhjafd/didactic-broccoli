import * as db from "../util/prisma";
import { ServiceError } from "../util/serviceError";

export function getUserIdFromUsername(username: string): string {
    // TODO: impl
    return "";
}

export async function register(username: string, nickname: string, password: string) {
    if (!/^[a-zA-Z0-9._-]+$/.test(username))
        throw new ServiceError("BadRequest", "wrong username");
    if ( !(3 <= username.length && username.length <= 80) )
        throw new ServiceError("BadRequest", "wrong username length");

    if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':",./<>?\\|~`]+$/.test(password))
        throw new ServiceError("BadRequest", "wrong password");
    if ( !(4 <= username.length) )
        throw new ServiceError("BadRequest", "wrong password length");

    if ( !(1 <= nickname.length && nickname.length <= 255) )
        throw new ServiceError("BadRequest", "wrong nickname length");

    // TODO: username 겹치는지 확인
    if (getUserIdFromUsername(username)) 
        throw new ServiceError("BadRequest", "username already taken");

    // TODO: insert db
    // db.prisma.username.
};